/// <reference types="node" />

import * as Git from 'nodegit';
import { WriteStream } from 'fs';

Git.Repository.discover("startPath", 1, "ceilingDirs").then((string) => {
    // Use 'string'
});

Git.Repository.init("path", 0).then((repository) => {
    // Use 'repository'
});

const repo = new Git.Repository();
const id = new Git.Oid();
const ref = new Git.Reference();

// AnnotatedCommit Tests

Git.AnnotatedCommit.fromFetchhead(repo, "branch_name", "remote_url", id).then((annotatedCommit) => {
    // Use 'annotatedCommit'
    annotatedCommit.free();
});

Git.AnnotatedCommit.fromRef(repo, ref).then((annotatedCommit) => {
    // Use 'annotatedCommit'
    annotatedCommit.free();
});

Git.AnnotatedCommit.fromRevspec(repo, "revspec").then((annotatedCommit) => {
    // Use 'annotatedCommit'
    annotatedCommit.free();
});

Git.AnnotatedCommit.lookup(repo, id).then((annotatedCommit) => {
    // Use 'annotatedCommit'
    annotatedCommit.free();
    annotatedCommit.id();
});

// Attr tests

const attrCallback: Git.Attr.Callback = (name, value, payload) => {
    // Use 'name', 'value', 'payload'
    return 0;
};

const macro = Git.Attr.addMacro(repo, "name", "values");

Git.Attr.cacheFlush(repo);

Git.Attr.get(repo, 1, "path", "name").then((string) => {
    // Use 'string'
});

const array = Git.Attr.getMany(repo, 1, "path", 1, ["names"]);

const value = Git.Attr.value("attr");

// Blame tests

const blameOptions = new Git.BlameOptions();
Git.Blame.initOptions(blameOptions, Git.Blame.OPTIONS_VERSION);

const blame = Git.Blame.file(repo, "path", blameOptions);
const buffer = new Buffer("modified content");
blame.buffer(buffer.toString(), buffer.length).then((blame) => {
    // Use 'blame'
    blame.free();
});
blame.getHunkByIndex(0);
blame.getHunkByLine(1);
const hunkCount = blame.getHunkCount();

// Blob tests

Git.Blob.lookup(repo, id).then((blob) => {
    blob.content();
    blob.dup();
    blob.filemode();
    blob.id();
    blob.isBinary();
    blob.owner();
    blob.rawcontent();
    blob.rawsize();
    blob.toString();
    blob.free();
});

Git.Blob.lookupPrefix(repo, id, 7).then((blob) => {
    blob.free();
});

const buf = Git.Blob.filteredContent("asPath", 1);
buf.free();

const id1 = Git.Blob.createFromBuffer(repo, new Buffer("content"), 7);

const success1 = Git.Blob.createFromDisk(id, repo, "path");

Git.Blob.createFromStream(repo).then((stream) => {
    // Use 'stream'
    stream.close();
});

Git.Blob.createFromStream(repo, "hintPath").then((stream) => {
    // Use 'stream'
    stream.close();
});

const id2 = Git.Blob.createFromStreamCommit(new WriteStream());

const success2 = Git.Blob.createFromWorkdir(id, repo, "relativePath");

// Branch tests

const commit = new Git.Commit();
Git.Branch.create(repo, "branch_name", commit, 0).then((reference) => {
    // Use 'reference'
});

const annotatedCommit = new Git.AnnotatedCommit();
Git.Branch.createFromAnnotated(repo, "branch_name", annotatedCommit, 0).then((reference) => {
    // Use 'reference'
});

Git.Branch.delete(ref);

Git.Branch.isHead(ref);

Git.Branch.iteratorNew(repo, Git.Branch.BRANCH.ALL);

Git.Branch.lookup(repo, "branch_name", Git.Branch.BRANCH.LOCAL).then((reference) => {
    // Use 'reference'
});

Git.Branch.move(ref, "new_branch_name", 0);

// TODO: Buf tests
