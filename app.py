from flask import Flask , render_template, request
import sqlite3
import matplotlib.pyplot as plt
import pandas as pd


def init_db():
    conn = sqlite3.connect("books_storage.db")
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS books (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              author TEXT NOT NULL,
              section TEXT,
              description TEXT,
              link text,
              date_added DATE DEFAULT CURRENT_TIMESTAMP
              )
""")
    

    conn.commit()
    conn.close()

init_db()

# search and filtering

def get_books(query=None, section=None):
    conn = sqlite3.connect("books_storage.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    sql = "SELECT title, author, section, description, link FROM books WHERE 1=1"
    params = []

    if query:
        sql += " AND (LOWER(title) LIKE ? OR LOWER(author) LIKE ?)"
        like_query = f"%{query.lower()}%"
        params.extend([like_query, like_query])

    if section:
        sql += " AND LOWER(section) = ?"
        params.append(section.lower())

    cursor.execute(sql, params)
    books = cursor.fetchall()
    conn.close()
    return books


app = Flask(__name__)

@app.route("/")
def home_page() :
    return render_template("index.html")

@app.route("/books")
def books_page() :
    # conn = sqlite3.connect("books_storage.db")
    # c = conn.cursor()
    # c.execute("SELECT title, author, section, description, link FROM books")
    # books = c.fetchall()
    query = request.args.get("search")
    section = request.args.get("section")
    books = get_books(query, section)
    return render_template("books.html", books = books)

@app.route("/data")
def data_page() :
      conn = sqlite3.connect("books_storage.db")

      df = pd.read_sql_query("SELECT * FROM books", conn)

      conn.close()

      section_counts = df["section"].value_counts()
      author_counts = df["author"].value_counts().head(10)

      # plot
      plt.figure(figsize=(10,6))
      author_counts.plot.pie(autopct='%1.1f%%')
      plt.title("Top 10 authors")
      plt.tight_layout()

      pie_path = 'static/pie.png'
      plt.savefig(pie_path)
      plt.close()



      plt.figure(figsize=(8,5))
      section_counts.plot(kind="bar" , color="skyblue")
      plt.title("Books per section :")
      plt.xlabel("section")
      plt.ylabel("number of books")
      plt.tight_layout()

      chart_path = "static/chart.png"
      plt.savefig(chart_path)
      plt.close()
      
      return render_template("data_v.html")

if (__name__ == "__main__"):
    app.run(debug=True)