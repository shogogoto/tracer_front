# 開発の進め方

## パッケージのインストール
プロジェクトルートで以下を実行
```bash
npm install
```

# テスト実行
ファイルを追加・更新することを検知して、自動でユニットテストを実行する<br>
プロジェクトルートで以下を実行
```bash
npm run test
```

# UIカタログの確認
## Storybook起動
```bash
npm run storybook
```

## Chromaticで確認
ローカルでStorybookを起動するのは重いので、Web上で確認する<br>
http://www.chromatic.com/library?appId=6472a477d5bbbd79b8f8f1ea
