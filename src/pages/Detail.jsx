import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { _getPost } from '../redux/modules/postSlice';
import Comments from '../components/comments/Comments';
import { useParams } from 'react-router-dom';
import { deletePost } from '../redux/modules/postSlice'
const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { id } = useParams()
    const posts = useSelector((state) => state.postSlice.post)

    useEffect(() => {
        dispatch(_getPost());
    }, [dispatch]);
    //   새로고침시 화면 안뜸
    let postt = posts.find((post) => {

        return String(post.id) === id;
    });
    return (
        <StModal >
            <StModalBox>
                <div>
                    <StTitButton >
                        <h1>상세페이지</h1>
                        <div>
                            <StButton onClick={() => { dispatch(deletePost(postt.id)); window.location.reload(); }}>삭제하기</StButton>
                            <StButton onClick={() => navigate('/update/'+postt.id)}>수정하기</StButton>
                            <Link to="/">
                                <StButton >이전으로</StButton>
                            </Link>

                        </div>
                    </StTitButton>
                    <StImgBox>
                        <img src={postt.imageUrl} />
                    </StImgBox>
                    <StTitName>
                        <h1 >{postt.title}</h1>
                        <p>❤️ 1</p>
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
    width: 150px;
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
        margin: 0 auto;
    `
