import EventEmmiter from 'events';

const TIMER_INTERVAL = 1000;

const createRandomField = (size = 200) => {
	let field = [];

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (!field[i]) {
				field[i] = [];
			}
			field[i][j] = Math.round(Math.random());
		}
	}

	return field;
};

class Evolution {
	constructor(props = {}) {
		if (props.field) {
			this.field = props.field;
		} else {
			this.field = createRandomField(props.size);
		}
		this.generation = 0;
		this.emmiter = new EventEmmiter();
		this.timer = null;
	}

	start() {
		this.timer = setInterval(() => {
			var { generation, field } = this;
			this.processNextGeneration();
			this.emmiter.emit('generationStep', { generation, field });
		}, TIMER_INTERVAL);
		return this.emmiter;
	}

	stop() {
		clearInterval(this.timer);
		this.timer = null;
	}

	generateField(size) {
		var field = createRandomField(size || this.field.lenght);
		this.setField(field);
		return field;
	}

	processNextGeneration() {
		var oldField = this.field,
			resultField = [];

		for (let i = 0; i < oldField.length; i++) {
			for (let j = 0; j < oldField.length; j++) {
				let numOfNeibourgs = 0;
				if (oldField[i - 1] !== undefined) {
					numOfNeibourgs =
						numOfNeibourgs +
						(oldField[i - 1][j - 1] ? 1 : 0) +
						(oldField[i - 1][j] ? 1 : 0) +
						(oldField[i - 1][j + 1] ? 1 : 0);
				}
				if (oldField[i + 1] !== undefined) {
					numOfNeibourgs =
						numOfNeibourgs +
						(oldField[i + 1][j - 1] ? 1 : 0) +
						(oldField[i + 1][j] ? 1 : 0) +
						(oldField[i + 1][j + 1] ? 1 : 0);
				}
				numOfNeibourgs = numOfNeibourgs + (oldField[i][j - 1] ? 1 : 0) + (oldField[i][j + 1] ? 1 : 0);
				if (resultField[i] === undefined) {
					resultField[i] = [];
				}
				if (oldField[i][j] && (numOfNeibourgs !== 3 && numOfNeibourgs !== 2)) {
					resultField[i][j] = 0;
				} else if (numOfNeibourgs === 3) {
					resultField[i][j] = 1;
				} else {
					resultField[i][j] = oldField[i][j];
				}
			}
		}

		// _.isEqual(resultField, oldField);

		this.setField(resultField);
		this.generation++;
		return resultField;
	}

	getField() {
		return this.field;
	}

	setField(field) {
		this.field = field;
	}
}

export default Evolution;
