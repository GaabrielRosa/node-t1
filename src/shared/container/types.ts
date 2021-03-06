const TYPES = {
  ClientRepository: Symbol('ClientRepository'),
  ClientService: Symbol('ClientService'),
  UserRepository: Symbol('UserRepository'),
  UserService: Symbol('UserService'),
  SessionService: Symbol('SessionService'),
  
  // Providers
  HashProvider: Symbol('HashProvider'),
  CacheProvider: Symbol('CacheProvider'),

  //Middlewares
  EnsureAuthenticated: Symbol('EnsureAuthenticated'), 
}

export { TYPES };
