import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin
    }

}
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render (){
            if (!this.props.isLogin)  return <Redirect to={'/login'}/>
              
              return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps,{})(RedirectComponent);
}