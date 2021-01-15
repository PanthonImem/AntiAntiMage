import pandas as pd
import numpy as np
import requests  
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import string
import time
import matplotlib.pyplot as plt
ua = UserAgent()

df = pd.read_csv('dotahero.csv', header = None)
df.columns = ['Hero','Role','Attribute']
for col in df.columns:
    df[col] = df[col].astype(str).str.replace("'","")
df['Role'] = df['Role'].str.replace(" ","")
df['Attribute'] = df['Attribute'].str.replace(" ","")

headers = {'User-Agent':ua.chrome}
page = requests.get("https://www.dotabuff.com/heroes/anti-mage/counters",headers = headers) 
soup = BeautifulSoup(page.content, 'html5lib')

def cleanstrip(string):
    return string.replace(' ','').replace('-','').replace("'",'').lower()
df['key'] = df['Hero'].apply(lambda x:cleanstrip(x))

def scan_str(tag, string):
    s = string.find(tag)+len(tag)+2
    for i in range(s+1,len(string)):
        if(string[i]=="\"" or string[i]==' ' or string[i]=='"'):
            e = i
    if('jpg' in string[s:e]):
        e = string.find('jpg')+3
    return string[s:e]
ls = []
for i in soup.find_all('tr'):
    if(i.text.count('%')==2 and ('width: 20px' not in str(i))):
        mystr = i.text.split('%')[0]
        num = mystr[-4:]
        hero = mystr[:-4]
        for c in string.punctuation:
            if(c!='-' and c!='.'):
                num = num.replace(c,'')
                hero = hero.replace(c,'')
                
        if('-' in mystr):
            num = float(num.replace('-',''))*-1
        hero = hero.replace('-','').replace('1','')
        #print(hero, num)
        ls.append((cleanstrip(hero),num))
df2 = pd.DataFrame(ls)
df2.columns = ['key','Advantage']
df2 = df2.sort_values('key')

page = requests.get("https://www.dota2.com/heroes/",headers = headers) 
soup2 = BeautifulSoup(page.content, 'html5lib')

ls = []
for i in soup2.find_all('img'):
    i = str(i)
    if('heroHoverLarge' in i):
        #print(i)
        hero = scan_str('id',i)
        ind = hero.find('"')
        hero = hero[6:ind].replace('_','')
        
        link = scan_str('src',i)
        ind = link.find('"')
        link = link[:ind]
        
        ls.append((hero,link))
df1 = pd.DataFrame(ls)
df1.columns = ['key','image']
df1 = df1.replace('abyssalunderlord','underlord')
df1 = df1.replace('centaur','centaurwarrunner')
df1 = df1.replace('doombringer','doom')
df1 = df1.replace('furion','naturesprophet')
df1 = df1.replace('magnataur','magnus')
df1 = df1.replace('necrolyte','necrophos')
df1 = df1.replace('nevermore','shadowfiend')
df1 = df1.replace('obsidiandestroyer','outworlddestroyer')
df1 = df1.replace('rattletrap','clockwerk')
df1 = df1.replace('shredder','timbersaw')
df1 = df1.replace('skeletonking','wraithking')
df1 = df1.replace('treant','treantprotector')
df1 = df1.replace('windrunner','windranger')
df1 = df1.replace('wisp','io')
df1 = df1.replace('zuus','zeus')
df1 = df1.sort_values('key')
tdf = df.merge(df2, how = 'left',left_on = 'key',right_on = 'key')
tdf = tdf.merge(df1, how = 'left',left_on = 'key',right_on = 'key')
tdf = tdf[tdf.key!='antimage']
tdf = tdf.drop_duplicates().reset_index(drop = True)
tdf = tdf.drop('key',axis = 1)
tdf['Advantage'] = tdf['Advantage'].astype(float)
tdf.to_json('hero.json')