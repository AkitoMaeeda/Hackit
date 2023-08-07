import  mysql.connector as mydb
import eel

#実行環境のステータス
cnx = mydb.connect(
    host = 'localhost',
    port = '3306',
    user = 'root',
    password = 'hackit',
    database = 'hackit'
)

@eel.expose
def CloseDBConnect():
    cnx.close()


#学籍番号から生徒の氏名を取り出す
@eel.expose
def Getstudentstatus(number): 
    cur = cnx.cursor()
    cur.execute("select * from student where id = " + number)
    rows = cur.fetchall()
    cur.close()
    print ("氏名取得close")
    return(rows[0])#returnにする

#学籍番号からスタッフの氏名を取り出す
@eel.expose
def Getmemberstatus(number1):
    cur = cnx.cursor()
    cur.execute("select name from member where id = " + number1)
    rows = cur.fetchall()
    cur.close()
    return(rows[0])

#貸し出し物の一覧の取得
@eel.expose
def Getitemsinformation():
    cur = cnx.cursor()
    cur.execute("select name from items")
    rows = cur.fetchall()
    cur.close()
    return(rows)

#選択された貸し出し物の在庫数を取得する
@eel.expose
def Getitemsinventory(itemname):
    cur = cnx.cursor()
    cur.execute("select inventory from items where name = '" + itemname+"'")
    rows = cur.fetchall()
    cur.close()
    print("在庫数取得close")
    return(rows[0])#在庫数返す

#鍵の貸し可能な鍵の取得
@eel.expose
def Getitemkeyinventory():
    cur = cnx.cursor()
    cur.execute("select name from itemkey where id = 1")
    rows = cur.fetchall()
    cur.close()
    return(rows)

#貸し出し登録の処理
@eel.expose
def RentItem(name, number, rentName, qty, mname, renttime):
    Numstr = str(number)
    cur = cnx.cursor()
    cur.execute("insert into now (name, id, rentName, qty, memberNameR, rentTime) values ('"+name + "'," +Numstr+",'"+rentName+"'," +qty+",'"+mname+"','"+renttime+"')")
    #cnx.commit()
    cur.execute("update items set inventory = inventory - "+qty +" where name = '"+rentName+"'")
    cnx.commit()
    cur.close()

#現在の貸し出し状況の把握
@eel.expose
def Rentstates():
    cur = cnx.cursor()
    cur.execute("select *from now")
    rows = cur.fetchall()
    cur.close()
    return(rows)
    
#鍵のレンタル
@eel.expose
def Rentkey(name, number, rentName, mname, renttime):
    Numstr = str(number)
    cur = cnx.cursor()
    cur.execute("insert into now (name, id, rentName, qty, memberNameR, rentTime) values ('"+name + "'," +Numstr + ",'" +rentName + "',1,'" +mname + "','" +renttime+"')")
    cur.execute("update itemkey set id = 0 where name = '"+ rentName +"'")#"delete from now where rentName = '"+ rentName +"'"
    cnx.commit()
    cur.close()

#鍵以外のアイテムを返却
@eel.expose
def ReturnItem(name, number, rentName, qty, mname, renttime, memberNameA, returnTime):
    Numstr = str(number)
    Qtystr = str(qty)
    cur = cnx.cursor()
    cur.execute("insert into after (name, id, rentName, qty, memberNameR, rentTime, memberNameA, returnTime) values ('"+name + "'," +Numstr + ",'" +rentName + "'," +Qtystr + ",'" +mname + "','" +renttime+"','" +memberNameA +"','" +returnTime +"')")
    cur.execute("delete from now where name = '"+name+"' and rentTime = '"+renttime+"' and rentName = '"+rentName+"'")
    cur.execute("update items set inventory = inventory + "+Qtystr +" where name = '"+rentName+"'")
    cnx.commit()
    cur.close()

#鍵の返却
@eel.expose
def ReturnKey(name, number, rentName, mname, renttime, memberNameA, returnTime):
    Numstr = str(number)
    cur = cnx.cursor()
    cur.execute("insert into after (name, id, rentName, qty, memberNameR, rentTime, memberNameA, returnTime) values ('"+name + "'," +Numstr + ",'" +rentName + "', 1,'" +mname + "','" +renttime+"','" +memberNameA +"','" +returnTime +"')")
    cur.execute("delete from now where name = '"+name+"'")
    cur.execute("update itemkey set id = 1  where name = '"+ rentName +"'")
    cnx.commit()
    cur.close()



