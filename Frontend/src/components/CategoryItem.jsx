import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    flex:1;
    margin: 3px;
    height: 70vh;
    position: relative;
    `
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

`
const Info = styled.div`
    position: absolute;
    width: 100%;
    height : 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Title = styled.h1`
    color: white;
    margin-bottom:10px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    color: gray;
    background-color: white;
    font-weight: 600;
    border-radius: 5px;
    transition: all .1s ease-in-out;
    cursor: pointer;
    &:hover{
        background-color: #f8e9e9;
        font-size: 95%;
    }
`

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/> 
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
        </Link>

    </Container>
  )
}

export default CategoryItem