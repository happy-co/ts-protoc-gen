"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filePathToPseudoNamespace(filePath) {
    return filePath.replace(".proto", "").replace(/\//g, "_").replace(/\./g, "_").replace(/\-/g, "_") + "_pb";
}
exports.filePathToPseudoNamespace = filePathToPseudoNamespace;
function snakeToCamel(str) {
    return str.replace(/(\_\w)/g, function (m) {
        return m[1].toUpperCase();
    });
}
exports.snakeToCamel = snakeToCamel;
function uppercaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.uppercaseFirst = uppercaseFirst;
var PROTO2_SYNTAX = "proto2";
function isProto2(fileDescriptor) {
    return (fileDescriptor.getSyntax() === "" || fileDescriptor.getSyntax() === PROTO2_SYNTAX);
}
exports.isProto2 = isProto2;
function oneOfName(name) {
    return uppercaseFirst(snakeToCamel(name));
}
exports.oneOfName = oneOfName;
function generateIndent(indentLevel) {
    var indent = "";
    for (var i = 0; i < indentLevel; i++) {
        indent += "  ";
    }
    return indent;
}
exports.generateIndent = generateIndent;
function getPathToRoot(fileName) {
    var depth = fileName.split("/").length;
    return depth === 1 ? "./" : new Array(depth).join("../");
}
exports.getPathToRoot = getPathToRoot;
function withinNamespaceFromExportEntry(name, exportEntry) {
    return exportEntry.pkg ? name.substring(exportEntry.pkg.length + 1) : name;
}
exports.withinNamespaceFromExportEntry = withinNamespaceFromExportEntry;
function filePathFromProtoWithoutExtension(protoFilePath) {
    return protoFilePath.replace(".proto", "_pb");
}
exports.filePathFromProtoWithoutExtension = filePathFromProtoWithoutExtension;
function withAllStdIn(callback) {
    var ret = [];
    var len = 0;
    var stdin = process.stdin;
    stdin.on("readable", function () {
        var chunk;
        while ((chunk = stdin.read())) {
            if (!(chunk instanceof Buffer))
                throw new Error("Did not receive buffer");
            ret.push(chunk);
            len += chunk.length;
        }
    });
    stdin.on("end", function () {
        callback(Buffer.concat(ret, len));
    });
}
exports.withAllStdIn = withAllStdIn;
//# sourceMappingURL=util.js.map