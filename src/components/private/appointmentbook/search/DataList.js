import React, { Component } from 'react';
import ModalConfirm from  '../../../ModalConfirm'
import NoResults from '../../templatesearch/noResults'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'

export default class DataList extends Component {
 
 
    render() {

        const results = this.props.filteredResults;

        if (results.length > 0) {
            return (
                <div>
                    <table className={TABLE_DEFAULT_CSS}>
                        <thead>
                            <tr>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (
                                    <tr key={result.id}>
                                       
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <ModalConfirm text="Confirma a exclusão da caderneta?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
                </div>
            );

        } else {
            return <NoResults />
        }
    }

}