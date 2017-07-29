import React, { Component } from 'react'
import { connect } from 'react-redux'
import Base64Service from '../../../services/app/Base64Service'
import CommodityService from '../../../services/commodity/CommodityService'
import { updateState } from '../../../actions/commodityActionCreator'
import { PanelHeader } from '../../panels'

 
class DeleteCommodity extends Component {
  
    componentDidMount() {
         this.props.findById(Base64Service.decode(this.props.params.id));
    }

    componentWillUnmount() {       
    }
    
    render() {
        return (
           <div className="space-container">
                <div className="container">
                    <PanelHeader icon="list" label="Estorno Mercadoria" />
                    <div className="panel">
                        <form>
                            <div className="container">
                                  {this.props.detailState.codigo}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
     return { detailState: state.detailCommodity }
}

const mapDispatchToProps = dispatch => {
    return {
       findById: (id) => {
            dispatch(CommodityService.findById(id, updateState));
        }
    }
}
const DeleteCommodityContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteCommodity);

export default DeleteCommodityContainer;