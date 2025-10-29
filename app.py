from flask import Flask, request, render_template, redirect, url_for
import os
import json

app = Flask(__name__)

CHAR_DIR = "characters"
os.makedirs(CHAR_DIR, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    result = ""
    if request.method == "POST":
        text = request.form.get("text", "").strip()
        if text == "あ":
            return redirect(url_for("success"))
        else:
            result = "失敗"
    return render_template("index.html", result=result)

@app.route("/success")
def success():
    return render_template("success.html")


@app.route("/create-character", methods=["GET", "POST"])
def create_character():
    message = ""
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        intro = request.form.get("intro", "").strip()
        personality = request.form.get("personality", "").strip()
        appearance = request.form.get("appearance", "").strip()
        role = request.form.get("role", "").strip()

        if not name:
            message = "キャラ名は必須です"
        else:
            filename = os.path.join(CHAR_DIR, f"{name}.json")
            data = {
                "name": name,
                "intro": intro,
                "personality": personality,
                "appearance": appearance,
                "role": role
            }
            with open(filename, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return redirect(url_for("success"))  # 保存後成功ページへ！

    return render_template("create_character.html", message=message)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
