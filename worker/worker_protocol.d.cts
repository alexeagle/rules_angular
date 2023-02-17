/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.3
 * source: worker_protocol.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from 'google-protobuf';

export declare namespace blaze.worker {
  class Input extends pb_1.Message {
    #private;
    constructor(
      data?:
        | any[]
        | {
            path?: string;
            digest?: Uint8Array;
          },
    );
    get path(): string;
    set path(value: string);
    get digest(): Uint8Array;
    set digest(value: Uint8Array);
    static fromObject(data: {path?: string; digest?: Uint8Array}): Input;
    toObject(): {
      path?: string | undefined;
      digest?: Uint8Array | undefined;
    };
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Input;
    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): Input;
  }
  class WorkRequest extends pb_1.Message {
    #private;
    constructor(
      data?:
        | any[]
        | {
            arguments?: string[];
            inputs?: Input[];
            request_id?: number;
            cancel?: boolean;
            verbosity?: number;
            sandbox_dir?: string;
          },
    );
    get arguments(): string[];
    set arguments(value: string[]);
    get inputs(): Input[];
    set inputs(value: Input[]);
    get request_id(): number;
    set request_id(value: number);
    get cancel(): boolean;
    set cancel(value: boolean);
    get verbosity(): number;
    set verbosity(value: number);
    get sandbox_dir(): string;
    set sandbox_dir(value: string);
    static fromObject(data: {
      arguments?: string[];
      inputs?: ReturnType<typeof Input.prototype.toObject>[];
      request_id?: number;
      cancel?: boolean;
      verbosity?: number;
      sandbox_dir?: string;
    }): WorkRequest;
    toObject(): {
      arguments?: string[] | undefined;
      inputs?:
        | {
            path?: string | undefined;
            digest?: Uint8Array | undefined;
          }[]
        | undefined;
      request_id?: number | undefined;
      cancel?: boolean | undefined;
      verbosity?: number | undefined;
      sandbox_dir?: string | undefined;
    };
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WorkRequest;
    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): WorkRequest;
  }
  class WorkResponse extends pb_1.Message {
    #private;
    constructor(
      data?:
        | any[]
        | {
            exit_code?: number;
            output?: string;
            request_id?: number;
            was_cancelled?: boolean;
          },
    );
    get exit_code(): number;
    set exit_code(value: number);
    get output(): string;
    set output(value: string);
    get request_id(): number;
    set request_id(value: number);
    get was_cancelled(): boolean;
    set was_cancelled(value: boolean);
    static fromObject(data: {
      exit_code?: number;
      output?: string;
      request_id?: number;
      was_cancelled?: boolean;
    }): WorkResponse;
    toObject(): {
      exit_code?: number | undefined;
      output?: string | undefined;
      request_id?: number | undefined;
      was_cancelled?: boolean | undefined;
    };
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WorkResponse;
    serializeBinary(): Uint8Array;
    static deserializeBinary(bytes: Uint8Array): WorkResponse;
  }
}
