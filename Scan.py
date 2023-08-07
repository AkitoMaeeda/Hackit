import os
import sys
sys.path.insert(1, os.path.split(sys.path[0])[0])
import nfc
import eel
import pygame

def play_sound(sound_file):
    pygame.mixer.init()
    pygame.mixer.music.load(sound_file)
    pygame.mixer.music.play()

service_code = 0x100B
StudentNum = 0


@eel.expose
def connected(tag):

    idm,pmm = tag.polling(system_code = 0x93B1)
    tag.idm, tag.pmm, tag.sys = idm, pmm, 0x93B1

    if isinstance(tag, nfc.tag.tt3.Type3Tag):
        try:

            sc = nfc.tag.tt3.ServiceCode(service_code >> 6, service_code & 0x3f)
            bc = nfc.tag.tt3.BlockCode(0,service=0)
            data = tag.read_without_encryption([sc],[bc])
            num = data[1:8]
            
            StudentNum = str(num.decode())

        except Exception as e:
            print("error: %s" % e)


    else:
        print("エラー")
        
            

    ##print(tag)
    ##print("////////////////////////////")
    ##print()
    ##print("////////////////////////////")
    ##print(('  \n  '.join(tag.dump())))
    
@eel.expose
def ConnectCard():
    clf = nfc.ContactlessFrontend("usb")
    tag = clf.connect(rdwr={'on-connect':connected})
    play_sound("src/Scansound.mp3")
    
    return(str(tag.read_without_encryption([nfc.tag.tt3.ServiceCode(service_code >> 6, service_code & 0x3f)],
                                      [nfc.tag.tt3.BlockCode(0,service=0)])[1:8].decode()))
    


