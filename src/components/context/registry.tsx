import React, { createContext, useContext } from 'react'

export class RegistryContext {
  private _registeredValues: Map<string, any> = new Map()

  private _pendingHandlers: Map<string, Function> = new Map()

  public registerHandler(contextName: string, handler: Function) {
    if (this._registeredValues.has(contextName)) {
      const storedValues = this._registeredValues.get(contextName)
      handler.apply(this, storedValues)
    } else {
      this._pendingHandlers.set(contextName, (...args) => {
        handler.apply(this, args)
      })
    }
  }

  public storeContextValues(contextName: string, values: any[]) {
    this._registeredValues.set(contextName, values)
    if (this._pendingHandlers.has(contextName)) {
      const handler = this._pendingHandlers.get(contextName)
      handler?.apply(null, values)
      this._pendingHandlers.delete(contextName)
    }
  }
}

const registryContext = new RegistryContext()

export const RegistryStoreContext = createContext<RegistryContext>(null)

export const RegistryContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <RegistryStoreContext.Provider value={registryContext}>{children}</RegistryStoreContext.Provider>
}

export const useRegistryContext = () => useContext(RegistryStoreContext)
