export default {
  spec_dir: "src/tests",
  spec_files: [
    "**/*[sS]pec.ts"
  ],
  helpers: [
    "helpers/**/*.ts"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,
    forbidDuplicateNames: true
  }
}
