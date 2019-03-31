import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'textcorrector'
})
export class TextcorrectorPipe implements PipeTransform {

	transform(value: any, args?: any): any {
		value = value.replace("_", " ");
		return (!!value) ? value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() : '';
	}

}
