import sqlite3

# Create a connection to the database
conn = sqlite3.connect('festarit.db')
cur = conn.cursor()

# Task 1: Hae kaikki festivaalit.
cur.execute("SELECT * FROM Festivaalit")
festivals = cur.fetchall()
print("Kaikki festivaalit:")
for festival in festivals:
    print(festival)

# Task 2: Hae kaikki artistit.
cur.execute("SELECT * FROM Artistit")
artists = cur.fetchall()
print("\nKaikki artistit:")
for artist in artists:
    print(artist)

# Task 3: Hae festivaalin kaikki artistit.
festivaali_id = 1  # Replace with the desired festival ID
cur.execute("SELECT Artistit FROM Festivaalit WHERE FestivaaliID = ?", (festivaali_id,))
festival_artists = cur.fetchone()
if festival_artists:
    print(f"\nFestivaalin {festivaali_id} artistit:")
    print(festival_artists[0])

# Task 4: Kaupungit, joissa artisti esiintyy.
artist_name = "Amorphis"  # Replace with the desired artist name
cur.execute("SELECT DISTINCT Paikka FROM Festivaalit WHERE Artistit LIKE ?", (f'%{artist_name}%',))
cities = cur.fetchall()
print("\nKaupungit, joissa", artist_name, "esiintyy:")
for city in cities:
    print(city[0])

# Task 5: Kaupunki, jossa tietty festivaali tapahtuu.
festival_name = "Festival Name"  # Replace with the desired festival name
cur.execute("SELECT Paikka FROM Festivaalit WHERE Nimi = ?", (festival_name,))
city = cur.fetchone()
if city:
    print(f"\nFestivaalin {festival_name} kaupunki:")
    print(city[0])

# Task 6: Festivaalit, joissa artisti esiintyy.
artist_name = "Amorphis"  # Replace with the desired artist name
cur.execute("SELECT * FROM Festivaalit WHERE Artistit LIKE ?", (f'%{artist_name}%',))
festivals_with_artist = cur.fetchall()
print("\nFestivaalit, joissa", artist_name, "esiintyy:")
for festival in festivals_with_artist:
    print(festival)

# Task 7: Festivaalit, joissa on eniten artisteja.
cur.execute("""SELECT F.Nimi AS FestivalName, COUNT(K.ArtistiID) AS ArtistCount
FROM Festivaalit F
JOIN Keikat K ON F.FestivaaliID = K.FestivaaliID
GROUP BY F.FestivaaliID
ORDER BY ArtistCount DESC
LIMIT 1;
""")
most_artists_festival = cur.fetchone()
if most_artists_festival:
    print("\nFestivaali, jossa on eniten artisteja:")
    print(most_artists_festival)

# Task 8: Festivaalien lajittelu ajankohdan mukaan.
cur.execute("SELECT * FROM Festivaalit ORDER BY Aika ASC")
sorted_festivals = cur.fetchall()
print("\nFestivaalit lajiteltuna ajankohdan mukaan:")
for festival in sorted_festivals:
    print(festival)


# Close the database connection
conn.close()
