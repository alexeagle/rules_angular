load("@build_bazel_rules_typescript//internal:common/tsconfig.bzl", "create_tsconfig")
load("@build_bazel_rules_typescript//internal:common/json_marshal.bzl", "json_marshal")
load("@build_bazel_rules_typescript//internal:build_defs.bzl", "tsc_wrapped_tsconfig")

def _expected_outs(ctx):
  result = [ctx.new_file(ctx.bin_dir, "ng_libs_marker")]

  # TODO(alexeagle): ngc should write the files in bazel-out, not in users node_modules
  # lenpkg = len(ctx.label.package) + 1 if ctx.label.package else 0
  # for src in ctx.files.srcs:
  #   if src.short_path.endswith(".metadata.json"):
  #     basename = src.short_path[lenpkg:-len(".metadata.json")]
  #     result += [ctx.new_file(ctx.bin_dir, basename + ext) for ext in [
  #       ".ngfactory.js",
  #       ".ngfactory.d.ts",
  #       ".ngsummary.js",
  #       ".ngsummary.d.ts",
  #       ".ngsummary.json",
  #     ]]
  return result

def _ng_external_libraries_impl(ctx):
  ts_files = [s for s in ctx.files.srcs if s.path.endswith(".ts")]
  tsconfig = dict(create_tsconfig(ctx, ts_files, []), **{
      "angularCompilerOptions": {
          "expectedOut": [o.path for o in _expected_outs(ctx)],
          "generateCodeForLibraries": True,
      }
  })

  tsconfig_json = ctx.new_file(ctx.label.name + "_tsconfig.json")
  ctx.file_action(output=tsconfig_json, content=json_marshal(tsconfig))

  ctx.action(
    progress_message = "Compiling external Angular libraries",
    inputs = ctx.files.srcs + ctx.files.node_modules + [tsconfig_json],
    outputs = _expected_outs(ctx),
    executable = ctx.executable.compiler,
    arguments = ["-p", tsconfig_json.path]
  )
  return struct(
    files = set(_expected_outs(ctx))
  )

ng_external_libraries = rule(
    implementation = _ng_external_libraries_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
        "runtime": attr.string(default = "browser"),
        "compiler": attr.label(default = Label("//internal/ngc"), executable = True, cfg = "host"),
        "node_modules": attr.label(default = Label("@//:node_modules")),
    },
)