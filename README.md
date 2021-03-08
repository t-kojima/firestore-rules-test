# firestore-rules-test

## テストの実行

```bash
yarn install
yarn firebase -P rules-test emulators:start
yarn jest
```

実施結果

```bash
> yarn jest

yarn run v1.22.10
warning package.json: No license field
 FAIL  test/rules/firestore.test.js
  firestore.rules test
    公開時刻を過ぎたドキュメントを取得
      ✓ getはできる (527 ms)
      ✕ listはできない（？） (137 ms)

  ● firestore.rules test › 公開時刻を過ぎたドキュメントを取得 › listはできない（？）

    Expected request to fail, but it succeeded.

      at node_modules/@firebase/rules-unit-testing/src/api/index.ts:576:9

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        1.845 s, estimated 2 s
Ran all test suites.
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
