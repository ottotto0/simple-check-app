const express = require('express');
const path = require('path');
const app = express();

// Render 等のホスト環境では環境変数 PORT を使う
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイルを public フォルダから配信
app.use(express.static(path.join(__dirname, 'public')));

// API: POST /api/check
// リクエストボディ: { "text": "ユーザーの入力" }
// レスポンス: { "result": "成功！" } または { "result": "失敗" }
app.post('/api/check', (req, res) => {
  try {
    let input = '';

    // JSON body か form body に対応
    if (req.body && typeof req.body.text === 'string') {
      input = req.body.text;
    } else if (req.query && typeof req.query.text === 'string') {
      input = req.query.text;
    }

    // 正確に「一文字の 'あ'」と一致するかを判定（前後の空白はトリム）
    const normalized = input.trim();
    if (normalized === 'あ') {
      return res.json({ result: '成功！' });
    } else {
      return res.json({ result: '失敗' });
    }
  } catch (err) {
    console.error('check error:', err);
    return res.status(500).json({ result: '失敗', error: 'サーバーエラー' });
  }
});

// ポートで待ち受け
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
