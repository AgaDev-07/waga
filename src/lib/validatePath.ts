export type ValidatePathFn = (pathname: string) => Record<string, string> | null;

export default function validatePath (template:string):ValidatePathFn {
		const pattern = template
			.replace(/:[^/]+/g, '([^/]+)')
			.replace(/\*/g, '(.*)');
	
		const regex = new RegExp(`^${pattern}$`);
	
		return (path) => {
			const match = path.match(regex);
	
			if (match) {
				const params = {};
	
				const paramNames = template.match(/:[^/]+/g) || [];
				paramNames.forEach((paramName, index) => {
					paramName = paramName.slice(1); // Remove the ":" from the paramName
					params[paramName] = match[index + 1];
				});
	
				if (template.includes('*')) {
					const remainingPath = match[paramNames.length + 1];
					params['*'] = remainingPath;
				}
	
				return params;
			}
	
			return null;
		};
	};
