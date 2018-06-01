import configparser
import json
import os,sys
import time
import uuid
from urllib import error, parse, request
from poster.encode import multipart_encode  
from poster.streaminghttp import register_openers  
import qrcode
import hashlib
import easygui
import comtypes.client 
import reportlab.pdfbase.ttfonts
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import portrait
from PyPDF2 import PdfFileWriter,PdfFileReader
from io import StringIO

reportlab.pdfbase.pdfmetrics.registerFont(reportlab.pdfbase.ttfonts.TTFont('heiTi','lib/msjh.ttf'))
config=configparser.ConfigParser()
config.read('config.ini')
host=config.get('base','host')
token=config.get('base','token')
tokenVaild=False
userName="CJ"
printId=12312
def get_mac_address():
    mac=uuid.UUID(int = uuid.getnode()).hex[-12:]
    return "".join([mac[e:e+2] for e in range(0,11,2)])

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

#获取主机名和mac地址用于生成打印token

def registToken():
    global token
    token=get_mac_address()+hostname()+time.strftime('%Y%m%d%H%M%S')
    md5= hashlib.md5()
    md5.update(token.encode(encoding='utf-8'))
    token=md5.hexdigest()
    return

#生成打印token用于上传文件使用


def showQR(token):
    data = token
    img_file = './py_qrcode.png'
    img = qrcode.make(data)
    img.save(img_file)
    img.show()
    return 0

#显示二维码图片

def checkToken():
    global token
    global tokenVaild
    global userName
    global printId
    url=host+"checkToken/"+token
    print(url)
    try:
        response = request.urlopen(url)
        print(response.read())
        response = json.loads(bytes.decode(response.read()))
        if (response['code'] == 0):
            printId=response['id']
            tokenVaild=response['tokenVaild']
            userName=response['userName']
            
    except error.URLError as e:
        return
        # if hasattr(e, 'code'):
        #     print("HTTPError")
        #     print(e.code)
        # elif hasattr(e, 'reason'):
        #     print("URLError")
        #     print(e.reason)


#检查token是否被注册可以使用

def fileChoose():
    path=easygui.fileopenbox()
    filePath=(conventPDF(path))
    return filePath

#选择上传用的文件并转换格式

def conventPDF(input):
    suffix=os.path.splitext(input)[1]
    fileName=os.path.splitext(os.path.split(input)[1])[0]
    dirname= os.path.split(os.path.realpath(sys.argv[0]))[0]
    output=dirname+"\\temp\\"+fileName+".pdf"
    doc2pdf(input, output)
    editPDF(input)
    return output,fileName

#pdf文件操作

def doc2pdf(input, output):
    wdFormatPDF=17
    word = comtypes.client.CreateObject('Word.Application')
    doc = word.Documents.Open(input)
    doc.SaveAs(output, FileFormat=wdFormatPDF)
    doc.Close()
    word.Quit()

#调用windows api转换pdf

def editPDF(filePath):
    pdf=canvas.Canvas("./temp/status.pdf")
    pdf.setFont('heiTi',10)
    textobject = pdf.beginText()
    textobject.setTextOrigin(inch,11*inch)
    textobject.textLines("派印微信小程序")
    textobject.textLine(("用户名："+userName))
    textobject.textLine("打印编码:"+str(printId))
    pdf.drawText(textobject)
    pdf.showPage()
    pdf.save()
    return

#给pdf添加状态页

def upload(filePath,fileName):
    url=host+"sendFile"
    register_openers()
    datagen,headers = multipart_encode({"file":open(filePath, "rb"),"type":"uploadFile","token":token,"fileName":fileName})
    req=request.Request(url,datagen,headers)
    response=request.urlopen(req)
    the_page=response.read()
    print(the_page.decode('utf8'))

    return

def main():
    #registToken()
    #showQR(token)
    #while(not tokenVaild):
    #    checkToken()
    #    time.sleep(1)
    filePath,fileName=fileChoose()
    #upload(filePath,fileName)
    return
if __name__ == '__main__':
    main()