import { LightningElement, track } from 'lwc';

export default class FrequencyBasedSelection extends LightningElement {
	value = '1x';
	// selectedDays = [];
	get options() {
		return [
			{ label: '1x', value: '1x' },
			{ label: '2x', value: '2x' },
			{ label: '3x', value: '3x' },
			{ label: '4x', value: '4x' },
			{ label: '5x', value: '5x' },
		];
	}

	prevSelectedDays = [];
	@track weekdays = [
		{ label: 'Monday', value: 'monday1' },
		{ label: 'Tuesday', value: 'tuesday1' },
		{ label: 'Wednesday', value: 'wednesday1' },
		{ label: 'Thursday', value: 'thursday1' },
		{ label: 'Friday', value: 'friday1' },
	];

	handleFrequencyChange(event) {
		this.value = event.detail.value;
		console.log(`Selected value is : ${this.value}`);

		this.prevSelectedDays = [];
		Array.from(this.template.querySelectorAll('lightning-input')).map(ele => ele.checked = false);
		
	}

	// get days() {
	// 	return [
	// 		{ label: 'Monday', value: 'monday1' },
	// 		{ label: 'Tuesday', value: 'tuesday1' },
	// 		{ label: 'Wednesday', value: 'wednesday1' },
	// 		{ label: 'Thursday', value: 'thursday1' },
	// 		{ label: 'Friday', value: 'friday1' },
	// 	];
	// }

	// daySelectHandler(event) {
	// 	if (event.detail.value) {
	// 		let tempArr = JSON.parse(JSON.stringify(this.selectedDays));
	// 		this.selectedDays = event.detail.value;
	// 		let freq = parseInt(this.value.replace(/[^0-9]/g, ''), 10);

	// 		this.selectedDays.forEach(element => console.log(`in foreach :${element}`));
	// 		console.log(`array length : ${freq}`);

	// 		if (this.selectedDays.length > freq) {
	// 			let diff = this.selectedDays.filter(x => tempArr.includes(x));
	// 			this.selectedDays.splice(this.selectedDays.indexOf(diff[0]), 1);
	// 		}
	// 	}
	// }

	weekDaySelectHandler(event) {
		console.log(`day selected : ${event.target.checked}`);
		console.log(`day selected Name : ${event.target.dataset.day}`);

		let freq = parseInt(this.value.replace(/[^0-9]/g, ''), 10);
		let selectedDayCount = Array.from(this.template.querySelectorAll('lightning-input')).filter(ele => ele.checked === true).length;

		console.log(`selected day count: ${selectedDayCount}`);
		console.log(`freq : ${freq}`);
		let selectedDay = event.target.dataset.day;

		Array.from(this.template.querySelectorAll('lightning-input')).filter(ele => ele.value === selectedDay).map(ele => ele.checked = event.target.checked);

		if (event.target.checked && selectedDayCount > freq) {
			//this.weekdays.filter(ele => ele.value === this.prevSelectedDays[0]).map(ele => ele.checked = false);
			console.log(`previous selected array : ${this.prevSelectedDays}`);
			
			Array.from(this.template.querySelectorAll('lightning-input')).filter(ele => {
				if (ele.dataset.day === this.prevSelectedDays[0]) {
					console.log(`in if : ${ele}`);
					ele.checked = false;
					return ele;
				}
			});

			this.prevSelectedDays.shift();
		}

		this.prevSelectedDays.push(event.target.dataset.day);
		console.log(`previsous array : ${this.prevSelectedDays}`);
	}
}