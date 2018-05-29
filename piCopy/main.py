import configparser
import json
import os
import time
import uuid
from urllib import error, parse, request
import qrcode

config=configparser.ConfigParser()
config.read('config.ini')
host=config.get('base','host')
shopId=config.get('base','shopId')
token=config.get('base','token')

def hostname():
    sys = os.name
    if sys == 'nt':
        hostname = os.getenv('computername')
        return hostname
    elif sys == 'posix':
        host = os.popen('echo $HOSTNAME')
        try:
            hostname = host.read()
            return hostname
        finally:
            host.close()
    else:
        return 'Unkwon hostname'

def get_mac_address():
    mac=uuid.UUID(int = uuid.getnode()).hex[-12:]
    return "".join([mac[e:e+2] for e in range(0,11,2)])

def regist():
    global token
    url=host+'getToken'
    body = {"mac": get_mac_address(), "name": hostname()}
    data = bytes(parse.urlencode(body), encoding='utf8')
    try:
        response = request.urlopen(url, data=data)
        response=json.loads(bytes.decode(response.read()))
        if(response['code']==0):
            config.set('base','token',response['token'])
            config.write(open('config.ini','w'))
            config.read('config.ini')
            token=config.get('base','token')
    except error.URLError as e:
        if hasattr(e, 'code'):
            print("HTTPError")
            print(e.code)
        elif hasattr(e, 'reason'):
            print("URLError")
            print(e.reason)

def showQR(token):
    data = token
    img_file = r'./py_qrcode.png'
    img = qrcode.make(data)
    img.save(img_file)
    img.show()
    return 0

def checkToken():
    global token
    url = host + "checkToken/"+token
    try:
        response = request.urlopen(url)
        response = json.loads(bytes.decode(response.read()))
        print(response)
        if (response['code'] == 0 and response['token']==None):
            config.set('base', 'token','')
            config.set('base', 'shopId', '')
            config.write(open('config.ini', 'w'))
            config.read('config.ini')
            token = config.get('base', 'token')

    except error.URLError as e:
        if hasattr(e, 'code'):
            print("HTTPError")
            print(e.code)
        elif hasattr(e, 'reason'):
            print("URLError")
            print(e.reason)

def askShopId():
    global shopId
    url=host+"getShop"
    body={'token':token}
    data=bytes(parse.urlencode(body), encoding='utf8')
    try:
        response = request.urlopen(url,data)
        response = json.loads(bytes.decode(response.read()))
        print(response)
        if (response['code'] == 0 and response['shopId']!=None):
            config.set('base', 'shopId', response['shopId'])
            config.write(open('config.ini', 'w'))
            config.read('config.ini')
            shopId = config.get('base', 'shopId')

    except error.URLError as e:
        if hasattr(e, 'code'):
            print("HTTPError")
            print(e.code)
        elif hasattr(e, 'reason'):
            print("URLError")
            print(e.reason)


def main():

    if(token==''):
        regist()
    else:
        checkToken()
    if(shopId=='' and token!=''):
        showQR(token)
        while(shopId==''):
            askShopId()
            time.sleep(3)
    
if __name__ == "__main__":
    main()
