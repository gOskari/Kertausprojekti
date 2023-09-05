import pandas as pd
import sqlite3
import excel_to_text
from datetime import datetime

data = excel_to_text.getJson()

# Luodaan SQLite-tietokanta ja avataan yhteys
con = sqlite3.connect('festarit.db')
cur = con.cursor()

# Luodaan taulut
create_festivaalit_table = '''
CREATE TABLE IF NOT EXISTS Festivaalit (
    FestivaaliID INTEGER PRIMARY KEY,
    Nimi TEXT,
    Aika DATETIME,
    Paikka TEXT,
    Artistit TEXT
);
'''

create_artistit_table = '''
CREATE TABLE IF NOT EXISTS Artistit (
    ArtistiID INTEGER PRIMARY KEY,
    Nimi TEXT,
    Maa TEXT,
    Kuvaus TEXT
);
'''

create_keikat_table = '''
CREATE TABLE IF NOT EXISTS Keikat (
    KeikkaID INTEGER PRIMARY KEY,
    FestivaaliID INTEGER,
    ArtistiID INTEGER,
    FOREIGN KEY (FestivaaliID) REFERENCES Festivaalit(FestivaaliID),
    FOREIGN KEY (ArtistiID) REFERENCES Artistit(ArtistiID)
);
'''

# Suoritetaan taulujen luontikomennot
cur.execute(create_festivaalit_table)
cur.execute(create_artistit_table)
cur.execute(create_keikat_table)

date_format = '%d-%m-%Y %H:%M:%S'

# FESTIVAALIT
festivaalit = [
    (
        festival['Nimi'],
        datetime.strptime(festival['Aika'], date_format),
        festival['Paikka'],
        festival['Artistit']
    )
    for festival in data['Festivaalit']
]

cur.executemany("INSERT INTO Festivaalit (Nimi, Aika, Paikka, Artistit) VALUES (?, ? , ?, ?)", festivaalit)

# ARTISTIT
artistit = [
    (
        artisti['Nimi'],
        artisti['Maa'],
        artisti['Kuvaus']
        )
    for artisti in data['Artistit']
]

cur.executemany("INSERT INTO Artistit (Nimi, Maa, Kuvaus) VALUES (?, ?, ?)", artistit)

# KEIKAT
ArtistiIDS = cur.execute("SELECT Nimi, ArtistiID FROM Artistit").fetchall()

for artisti in ArtistiIDS:
    festarit_id = cur.execute(f"SELECT FestivaaliID FROM Festivaalit WHERE Artistit LIKE ?", (f'%{artisti[0]}%', )).fetchall()
    
    for id in festarit_id:
        print('Festari: ' + str(id[0]))
        print('Artisti: ' + str(artisti[0]))
        print()
        cur.execute("INSERT INTO Keikat (FestivaaliID, ArtistiID) VALUES (?, ?)", (id[0], artisti[1]))

con.commit()
con.close()

print("Tiedot on tallennettu tietokantaan.")