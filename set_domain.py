#!/usr/bin/env python3
"""Wpisuje Twoją domenę w canonical, mapie strony, robots.txt i danych strukturalnych.
Użycie:  python3 set_domain.py https://twojadomena.pl      (Twój prawdziwy adres)"""
import sys, os
if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
    sys.exit("Podaj adres, np.: python3 set_domain.py https://mojafirma.pl")
new = sys.argv[1].rstrip("/")
old = "https://twojadomena.pl"
n = 0
for fn in os.listdir(os.path.dirname(os.path.abspath(__file__)) or "."):
    if fn.endswith((".html", ".xml", ".txt")):
        t = open(fn, encoding="utf-8").read()
        if old in t:
            open(fn, "w", encoding="utf-8").write(t.replace(old, new)); n += t.count(old)
print(f"Podmieniono {n} wystąpień na {new}")
