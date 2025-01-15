export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修復問題
        'docs',     // 文檔修改
        'style',    // 代碼格式修改
        'refactor', // 代碼重構
        'perf',     // 改善性能
        'test',     // 測試相關
        'build',    // 構建系統或外部依賴變動
        'ci',       // CI 配置變更
        'chore',    // 其他修改
        'revert'    // 回退版本
      ]
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0],
    'subject-case': [0],
    'header-max-length': [0]
  }
} 