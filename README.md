# チャレンジ AI クイズ

公開ホスティング: https://aiquiz.taigasaito.org

## 開発

※ Node.js v22.x と pnpm v9.x がインストールされていることが必要です

1. [`.env` の設定](#env-の設定)
2. パッケージのインストール
   ```
   pnpm install
   ```
3. データベースの migration
   ```
   pnpm migrate
   ```
4. 開発サーバーの起動
   ```
   pnpm dev
   ```

開発サーバーが http://localhost:3000 で起動します。

## `.env` の設定

まず、`.env.example` のコピーを作成し、`.env` にリネームします。

次に、以下の説明を参考に値を書き込みます。

| キー                                 | 説明                                                                                                        |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| APP_URL                              | このアプリケーションを設置する URL。<br>`http(s)?://` を含め、末尾にスラッシュは含めない。                  |
| AUTH_GOOGLE_ID<br>AUTH_GOOGLE_SECRET | Google アカウントでの OAuth で使用。<br>Google cloud console よりクライアント ID とシークレットを取得する。 |
| AUTH_SECRET                          | Auth.js 用のシークレット。<br>JWT の署名などに使用されるため、ランダムな文字列が好ましい。                  |
| GEMINI_API_KEY                       | Gemini の API キー。<br>Google AI Studio より取得する。                                                     |
| POSTGRES_URL                         | PostgreSQL へ接続するための URL。                                                                           |

## ライセンス

ソースコードは MIT ライセンスの下で利用可能です。
