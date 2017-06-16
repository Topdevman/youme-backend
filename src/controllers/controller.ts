import { Router, Request, Response } from "express";

// import { Authenticator } from "../middleware/Authenticator";

const CONTROLLERS = new Map<Object, IControllerMeta>();

export abstract class Controller
{
	protected router = Router();

	constructor(protected rootRoute : string, router : Router)
	{
		router.use(rootRoute, this.router);		

		let cont = CONTROLLERS.get(this.constructor);
		if (cont)
		{
			for (let route of cont.routes)
			{
				let callback = (req : Request, res: Response) => {
					(<any>this)[route.functionName](req, res);
				};
				(<any>this.router)[route.method](route.path, ...[...route.middleware, callback]);
			}
		}
	}

	public static route(method : string, path : string, middleware : Function[])
	{
		return (object : Controller, functionName : string) : void => {
			let constructor = object.constructor
			let cont = CONTROLLERS.get(constructor) || {
				objectConstructor : constructor,
				routes : new Array<IControllerRoute>()
			};

			cont.routes.push({
				path,
				functionName,
				method,
				middleware
			});

			CONTROLLERS.set(constructor, cont);
		};
	}

	public static get(path : string, middleware : Function[] = [])
	{
		return this.route("get", path, middleware);
	}

	public static post(path : string, middleware : Function[] = [])
	{
		return this.route("post", path, middleware);
	}

	public static put(path : string, middleware : Function[] = [])
	{
		return this.route("put", path, middleware);
	}

	public static delete(path : string, middleware : Function[] = [])
	{
		return this.route("delete", path, middleware);
	}
}

interface IControllerMeta
{
	objectConstructor : Function;
	routes : Array<IControllerRoute>;
}

interface IControllerRoute
{
	path : string;
	functionName : string;
	method : string;
	middleware : Function[]
}
