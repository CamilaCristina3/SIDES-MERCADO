import React, { createContext, useContext, useState } from 'react'

const HelpContext = createContext()

export function HelpProvider({ children }) {
  const [helpOpen, setHelpOpen] = useState(false)
  const [helpContent, setHelpContent] = useState('')

  const showHelp = (content = '') => {
    setHelpContent(content)
    setHelpOpen(true)
  }

  const hideHelp = () => {
    setHelpOpen(false)
    setHelpContent('')
  }

  return (
    <HelpContext.Provider value={{ 
      helpOpen, 
      helpContent,
      showHelp, 
      hideHelp 
    }}>
      {children}
    </HelpContext.Provider>
  )
}

export function useHelp() {
  const context = useContext(HelpContext)
  if (!context) {
    throw new Error('useHelp must be used within a HelpProvider')
  }
  return context
}
