import sqlite3
import csv

# Paths
CSV_FILE = "cities.csv"
DB_FILE = "cities.db"

# Connect (creates the DB file if it doesn't exist)
conn = sqlite3.connect(DB_FILE)
c = conn.cursor()

# Drop table if it exists, then create new one
c.execute("DROP TABLE IF EXISTS cities")
c.execute("""
    CREATE TABLE cities (
        id TEXT PRIMARY KEY,
        name TEXT,
        alternate_names TEXT,
        country_code TEXT,
        region_code TEXT
    )
""")

# Read CSV and insert into table
with open(CSV_FILE, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    rows = [
        (
            row["id"],
            row["name"],
            row.get("alternate_names", ""),
            row["country_code"],
            row.get("region_code", "")
        )
        for row in reader
    ]

c.executemany("INSERT INTO cities VALUES (?, ?, ?, ?, ?)", rows)
conn.commit()
conn.close()

print(f"✅ Successfully imported {len(rows)} rows into {DB_FILE}")
