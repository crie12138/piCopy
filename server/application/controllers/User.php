<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
use \QCloud_WeApp_SDK\Cos\CosAPI as Cos;

class User extends CI_Controller {
    public function getShops(){
        try{
            $rows=DB::select("shops",['id','name','latitude','longitude','location','page_price']);
            $this->json([
                'code'=>0,
                'shops'=>$rows
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }

    }

    public function getShopInfo($shopId){
        try{
            $row=DB::row("shops",['id','name','page_price','location','photo'],['id'=>$shopId]);
            $this->json([
                'code'=>0,
                'shopInfo'=>$row
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }
    }

    public function checkToken($token){
        $tokenVaild=FALSE;
        try{
            $row=DB::row('fileSender',['*'],['user_token'=>$token]);
            $tokenVaild=empty($row);
            $this->json([
                'code'=>0,
                'tokenVaild'=>!$tokenVaild,
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }
    }

    public function registToken(){
        $tokenInfo=$_POST;
        try{
            DB::insert('fileSender',['shop_id'=>$_POST['shopId'],'open_id'=>$_POST['openId'],'user_token'=>$_POST['token']]);
            $this->json([
                'code'=>0
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }
        
    }

    public function uploadFile(){
        $file= $_FILES['file'];
        $cosClient = Cos::getInstance();
        $cosConfig = Conf::getCos();
        $bucketName = $cosConfig['fileBucket'];
        $folderName = 'files';
        try {
            /**
             * 列出 bucket 列表
             * 检查要上传的 bucket 有没有创建
             * 若没有则创建
             */
            $bucketsDetail = $cosClient->listBuckets()->toArray()['Buckets'];
            $bucketNames = [];
            foreach ($bucketsDetail as $bucket) {
                array_push($bucketNames, explode('-', $bucket['Name'])[0]);
            }

            // 若不存在 bucket 就创建 bucket
            if (count($bucketNames) === 0 || !in_array($bucketName, $bucketNames)) {
                $cosClient->createBucket([
                    'Bucket' => $bucketName,
                    'ACL' => 'public-read'
                ])->toArray();
            }

            // 上传文件
            $fileFolder = $folderName ? $folderName . '/' : '';
            $fileKey = $fileFolder . md5(mt_rand()) . '-' . $file['name'];
            $uploadStatus = $cosClient->upload(
                $bucketName,
                $fileKey,
                file_get_contents($file['tmp_name'])
            )->toArray();

        } catch (Exception $e) {
            $this->json([
                'code' =>-1,
                'error' => $e->__toString()
            ]);
        }
        $infoArry=$_POST;
        $msg=null;
        $code=0;
        try{
            $row = DB::row("fileSender",['shop_id'],['user_token'=>$infoArry['token']]);
            $row = get_object_vars($row);
            $shop = DB::row("shops",['page_price'],['id'=>$row['shop_id']]);
            $shop = get_object_vars($shop);
            $price = $infoArry['pagesNum']*$shop['page_price'];
            DB::update("fileSender",[
                'fileURL'=>$uploadStatus["Location"],
                'origin_name'=>$infoArry["fileName"],
                'price'=>$price,
            ],['user_token'=>$infoArry['token']]);
            
            $this->json([
                "code"=>$code
            ]);
        }catch(Expection $e){
            $code=-1;
            $this->json([
                'code'=>$code,
                'err'=>$e->getMessage(),
            ]);
        }
    }

    public function fileConfirm($token){
        $row = DB::row('fileSender',['price','fileURL','origin_name'],['user_token'=>$token]);
        $row = get_object_vars($row);
        if($row['fileURL']!=NULL){
            $this->json([
                'code'=>0,
                'fileURL'=>$row['fileURL'],
                'origin_name'=>$row['origin_name'],
                'price'=>$row['price']
            ]);
        }else{
            $this->json([
                'code'=>1,
            ]);
        }
        
        

    }
    public function orderConfirm($token){
        $create_time = date('Y-m-d h:i:s', time());
        DB::update('fileSender',['create_time'=>$create_time],['token'=>$token]);
        $this->json([
            'code'=>0,
        ]);
    }
}
