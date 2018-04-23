import React, { Component } from 'react';

import './Field.css';

class Field extends Component {
	selectCell(rindex, cindex) {
		return () => {
			let { field, updateFieldCallback } = this.props;
			field[rindex][cindex] = Number(!field[rindex][cindex]);
			updateFieldCallback(field);
		};
	}
	render() {
		const { field } = this.props;
		console.log('reder', field);
		return (
			<div className="field">
				{field &&
					field.map((el, rindex) => (
						<div key={rindex} className="field-row">
							{el.map((cell, cindex) => (
								<div
									key={rindex + ',' + cindex}
									onClick={this.selectCell(rindex, cindex)}
									className={`field-cell ${cell ? 'field-cell_filled' : ''}`}
								/>
							))}
						</div>
					))}
			</div>
		);
	}
}

export default Field;
