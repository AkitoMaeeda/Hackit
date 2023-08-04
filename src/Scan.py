import os
import sys
sys.path.insert(1, os.path.split(sys.path[0])[0])
import nfc
service_code = 0x100B



def connected(tag):

    idm,pmm = tag.polling(system_code = 0x93B1)
    tag.idm, tag.pmm, tag.sys = idm, pmm, 0x93B1

    if isinstance(tag, nfc.tag.tt3.Type3Tag):
        try:

            sc = nfc.tag.tt3.ServiceCode(service_code >> 6, service_code & 0x3f)
            bc = nfc.tag.tt3.BlockCode(0,service=0)
            data = tag.read_without_encryption([sc],[bc])
            num = data[1:8]
            print("学籍番号" + str(num.decode()))
            print("")

        except Exception as e:
            print("error: %s" % e)


    else:
        print("エラー")
            

    ##print(tag)
    ##print("////////////////////////////")
    ##print()
    ##print("////////////////////////////")
    ##print(('  \n  '.join(tag.dump())))

def ConnectCard():
    clf = nfc.ContactlessFrontend("usb")
    print("学生証をかざせ！！")
    tag = clf.connect(rdwr={'on-connect':connected})


