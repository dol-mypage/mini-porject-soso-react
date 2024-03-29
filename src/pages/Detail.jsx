import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect,useState } from "react";
import { useSelector } from 'react-redux';
import { _getPost } from '../redux/modules/postSlice';
import Comments from '../components/comments/Comments';
import { useParams } from 'react-router-dom';
import { deletePost,likePost,hatePost,_deletePost } from '../redux/modules/postSlice'
import { getCookie } from '../shared/cookie';

const Detail = () => {
    let token = getCookie("ACESS_TOKEN");
    let refresh = getCookie("REFRESH_TOKEN");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()

    // const isdeleted = useSelector((state) => state.postSlice.isDelete)
    
    const posts = useSelector((state) => state?.postSlice?.post)
    

    useEffect(() => {
        setTimeout(() =>{dispatch(_getPost());},1000)
    }, [dispatch]);
    //   새로고침시 화면 안뜸
    let postt = posts?.find((post) => {

        return String(post.id) === id;
    });

  


    // const likeClick = () => {
    //     if(posts.isLike){
    //         dispatch(__FecthLike( () => {
    //         const payload = {
    //             id:postt.id,
    //             like: postt.count+1,

    //         }
    //     }))
    //     }else{
    //         dispatch(likePost({...postt, likes: postt.count+1}))
    //     }
    // }
    const onClickDeleteHandler = () => {
         const payload = {
            id:postt.id,
            token: token,
            refresh: refresh
         }
         dispatch(_deletePost(payload))
         dispatch(deletePost(payload))
         navigate('/main')
        
        
    }

    return (
        <StModal >
            <StModalBox>
                <div>
                    <StTitButton >
                        <h1>상세페이지</h1>
                        <Img>
                            <StButton onClick={onClickDeleteHandler}>삭제하기</StButton>

                            <StButton onClick={() => navigate('/main/update/'+postt.id)}>수정하기</StButton>
                            <Link to="/main">
                                <StButton >이전으로</StButton>
                            </Link>
                        </Img>
                    </StTitButton>
                    <div>
                    <StImgBox>
                        <img src={postt?.imageUrl} />
                    </StImgBox>
                    </div>
                    <StTitName>


                        <h1 >제목:{postt?.title} </h1><span>작성자:{postt?.member.nickname}</span>

                        {/* <div> <p> {like
                        ? (<Like size="20px" style={{color:'red'}} bold onClick={likeClick}>
                        ♥
                      </Like>
                        ) : (
                      <Like size="20px" bold onClick={likeClick}>
                        ♡
                      </Like> 
                        )} </p>{postt.count}</div> */}

                    </StTitName>
                </div>
                <Comments />

            </StModalBox>
        </StModal>
    )
}

export default Detail
const StModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  overflow-y: scroll;  
`
const StModalBox = styled.div`
  width: 90%;
  max-width: 800px;
  padding: 15px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`
const StTitButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StButton = styled.button`
    margin: 0 5px;
    width: 100px;
    height: 40px;
    border: none;
    background-color: #3858e9;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    :hover{
        background-color: #fff;
        color:#000
    }
    `
const StTitName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `
const StImgBox = styled.div`
       position: relative;
display: inline-flex;
width: 90%;
border-radius: 10px;
overflow: hidden;
    `
const Img = styled.div`
    border-radius: 15px;
margin-bottom:1rem;
background-color: white;
// 줄바꿈 방지
display:inline-block;
max-width: 50%;
    `