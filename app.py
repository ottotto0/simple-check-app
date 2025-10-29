from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = ""
    if request.method == "POST":
        text = request.form.get("text", "").strip()
        if text == "あ":
            # 成功なら success ページへリダイレクト
            return redirect(url_for("success"))
        else:
            result = "失敗"
    return render_template("index.html", result=result)

@app.route("/success")
def success():
    return render_template("success.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
