import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'


class Home extends Component{

    handleClick = (id)=>{
        this.props.addToCart(id);
    };

    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                    <div className="card-content">
                        <span className="card-title">{item.name}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light #077a79" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                        <p>{item.label}</p>
                        <p><b>Price: {item.price}$</b></p>
                    </div>
                </div>
            )
        });

        return(
            <div className="container">
                <h3 className="center">Our product</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        items: state.items
    }
};
const mapDispatchToProps= (dispatch)=>{

    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home)
