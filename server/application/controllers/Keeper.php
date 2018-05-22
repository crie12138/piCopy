<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Cos\CosAPI as Cos;
use \QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Keeper extends CI_Controller {
    public function regist(){
        $dataArry=$_POST;
        $code=0;
        $msg=NULL;
        try{
            DB::update("keepers",[
                "real_name"=>$dataArry['realName'],
                "phone"=>intval($dataArry['phone']),
            ],['open_id'=>$dataArry['openId']]);
        }catch(Exception $e){
            $code=-1;
            $msg=$e->getMessage();
        }
        $this->json([
            "code" => $code,
            "data" =>$msg,
        ]);
    }
//商家信息完善注册

    public function shopRegist(){
        $file = $_FILES['file']; // 去除 field 值为 file 的文件

        ini_set('upload_max_filesize', '10M');
        ini_set('post_max_size', '10M');

        // 限制文件格式，支持图片上传
        if ($file['type'] !== 'image/jpg' && $file['type'] !== 'image/jpeg' && $file['type'] !== 'image/png') {
            $this->json([
                'code' => 1,
                'data' => '不支持的上传图片类型：' . $file['type']
            ]);
            return;
        }
        
        // 限制文件大小：5M 以内
        if ($file['size'] > 5 * 1024 * 1024) {
            $this->json([
                'code' => 1,
                'data' => '上传图片过大，仅支持 5M 以内的图片上传'
            ]);
            return;
        }

        $cosClient = Cos::getInstance();
        $cosConfig = Conf::getCos();
        $bucketName = $cosConfig['fileBucket'];
        $folderName = "shopPhotos";

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
                'code' => 1,
                'error' => $e->__toString()
            ]);
        }
        $infoArry=$_POST;
        $msg=null;
        $code=0;
        try{
            DB::insert("shops",[
                "name"=>$infoArry['shopName'],
                "photo"=>$uploadStatus["Location"],
                "location"=>$infoArry['address'],
                'latitude'=>$infoArry['latitude'],
                'longitude'=>$infoArry['longitude'],
                "page_price"=>$infoArry['price']
            ]);
            $this->json([
                'code' => 0,
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage(),
                'location'=>$shopLocation,
            ]);
        }
    }
}