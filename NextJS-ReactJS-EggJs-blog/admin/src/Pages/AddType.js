

import React,{useState,useEffect} from 'react';
import '../static/css/AddType.css'
import { List ,Row ,Col  ,message ,Button,Drawer,Input,Select} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const { Option } = Select

function AddType(props){
    
    const [list,setList]=useState([])
    const [visible,setVisible]=useState(false)
    const [typeName,setTypeName]=useState('')
    const [iconName,setIconName]=useState('')
    const [typeId,setTyeId] = useState(1) 
    const [flag,setFlag] = useState(true) 
    const [orderNum,setOrderNum] = useState(0) 
    const [classify,setClassify] = useState('lucyA') 
    const [classify2,setClassify2] = useState('前端') 
   
    const getList = ()=>{
        axios({
                method:'get',
                url: servicePath.getTypeInfo,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' }
            }).then(
            res=>{
                let Data=res.data.data
                setList(Data)
                setOrderNum(Data[Data.length-1].orderNum) 
                //console.log(res.data.data)
                }
            )
        
    } 
    useEffect(()=>{
        getList()
    },[])
   
    const updateArticle =  (item,checked)=>{
        setVisible(true)
        setTypeName(item.typeName)
        setIconName(item.icon)
        setTyeId(item.id)
        setFlag(true)
        //console.log(item)
        switch (item.classify){
            case '后端':
                setClassify('lucyB')
                break
            case '生活动态':
                setClassify('lucyC')
                break
            case '网络':
                setClassify('lucyD')
                break
            case '运维':
                setClassify('lucyE')
                break
            case '插件':
                setClassify('lucyF')
                break
            default :
                setClassify('lucyA')
        }
       
    }
    const AddType = (item) =>{
        setVisible(true)
        setTypeName('')
        setIconName('')
        //console.log(item)
        switch (item.classify){
            case '后端':
                setClassify('lucyB')
                break
            case '生活动态':
                setClassify('lucyC')
                break
            case '网络':
                setClassify('lucyD')
                break
            case '运维':
                setClassify('lucyE')
                break
            case '插件':
                setClassify('lucyF')
                break
            default :
                setClassify('lucyA')
        }
        setFlag(false)
    }
    const onClose = ()=>{
        setVisible(false)
    }
    
    const onReset = () => {
        setTypeName('')
        setIconName('')
    }
    let typeData={
        typeName:typeName,
        icon:iconName,
        classify:classify2
    }
    const onSubmit = () => {
        if(flag){
            typeData.id=typeId
            axios({
                method:'POST',
                url: servicePath.updateType,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:typeData
            }).then(
                res=>{ 
                    //console.log(res.data)
                    if(res.data.isScuccess){
                        message.success('类别修改成功')
                        getList()
                    }else{
                        message.error('类别修改失败');
                    }
                }
            )
        }else{
            typeData.orderNum=orderNum+1
            axios({
                method:'POST',
                url: servicePath.addType,
                withCredentials: true,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:typeData
            }).then(
                res=>{ 
                    //console.log(res.data)
                    if(res.data.isScuccess){
                        message.success('类别添加成功')
                        getList()
                    }else{
                        message.error('类别添加失败');
                    }
                }
            )
        }
        
    }
  
    const typeChange = (e) => {
        e.persist()
        //console.log(e.target.value)
        setTypeName(e.target.value)
    }
    const iconChange = (e) =>{
        e.persist()
        //console.log(e.target.value)
        setIconName(e.target.value)
    }
    const classifyChange= (value) =>{
        //e.persist()
        //console.log(value)
        setClassify2(value.label)
    }
    return (
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={4} className="text-center">
                            <b>类别</b>
                        </Col>
                        <Col span={4} className="text-center">
                            <b>图标</b>
                        </Col>
                        <Col span={4} className="text-center">
                            <b>序列</b>
                        </Col>
                        <Col span={4} className="text-center">
                            <b>归类</b>
                        </Col>
                       
                        <Col span={8} className="text-center">
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={4} className="text-center">
                                {item.typeName}
                            </Col>
                            <Col span={4} className="text-center">
                                {item.icon}
                            </Col>
                            <Col span={4} className="text-center">
                                {item.orderNum}
                            </Col>
                            <Col span={4} className="text-center">
                                {item.classify}
                            </Col>
                    
                            <Col span={8} className="text-center">
                              <Button 
                                type="primary" 
                                onClick={
                                    ()=>{updateArticle(item)}
                                }
                                className="margin_right"
                                >修改
                              </Button>
                              <Button 
                                ghost 
                                type="primary" 
                                onClick={AddType.bind(this,item)}
                                className="margin_right"
                              >添加
                              </Button>
                              <Button ghost disabled>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                
                />
                 <Drawer
                    title="修改类别"
                    width={720}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    placement="left"
                    footer={
                        <div className="text_right">
                        <Button
                            onClick={onClose}
                            style={{ marginRight: 8 }}
                        >
                            取消
                        </Button>
                        <Button onClick={onClose} type="primary">
                            确认
                        </Button>
                        </div>
                    }
                    >
                   
                        <Row gutter={[16,16]}>
                            <Col span={6}>
                                <p className="text_right">类别</p>
                            </Col>
                            <Col span={12}>   
                                <Input 
                                    value={typeName}  
                                    onChange={typeChange} 
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16,16]}>
                            <Col span={6}>
                                <p className="text_right">图标</p>
                            </Col>
                            <Col span={12}>   
                                <Input 
                                    value={iconName} 
                                    onChange={iconChange}
                                />  
                            </Col>
                        </Row>
                        <Row gutter={[16,16]}>
                            
                            <Col span={6}>
                                <p className="text_right">归类</p>
                            </Col>
                            <Col span={12}>
                                <Select 
                                    labelInValue
                                    //defaultValue={{value:classify}} 
                                    value={{value:classify}}
                                    onChange={classifyChange}
                                    onSelect={(item)=>{
                                        setClassify(item.value)
                                        //console.log(item)
                                    }}
                                    style={{width:'300px'}}
                                >
                                    <Option key="lucyA" value="lucyA">前端</Option>
                                    <Option key="lucyB" value="lucyB">后端</Option>
                                    <Option key="lucyC" value="lucyC">生活动态</Option>
                                    <Option key="lucyD" value="lucyD">网络</Option>
                                    <Option key="lucyE" value="lucyE">运维</Option>
                                    <Option key="lucyF" value="lucyF">插件集合</Option>
                                </Select>
                            </Col>
                           
                        </Row>
                        <Row gutter={[16,16]}>
                            <Col span={6}>
                            </Col>
                            <Col span={12}>
                               
                                    <Button type="primary" className="margin_right" onClick={onSubmit}>
                                        提交
                                    </Button>
                                    <Button  onClick={onReset}>
                                        重置
                                    </Button>
                              
                            </Col>
                        </Row>
                   
                </Drawer>

        </div>
    )

}

export default AddType