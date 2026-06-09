/**
 * A pre-pass over the parsed element tree, run before conversion. Each
 * implementation rewrites or annotates the tree in place ({@link FenceNormalizer}
 * pairs fence operators, {@link TableAnnotator} stamps wrapper flags).
 *
 * `convertTreeToLatex` runs every registered normalizer in order, so adding a
 * new pass means implementing this protocol and appending it to the pipeline
 * list, without touching the conversion loop or the existing passes.
 */
export interface TreeNormalizer {
  normalize(): void;
}
