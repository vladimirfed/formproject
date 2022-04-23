export interface iOptions {
    /** Data Layer object name 
     */
    dataLayer?: string
    /** If the background color is dark or light
     */
    darkMode?: boolean
    /** Primary action color. Used for buttons and links.
     */
    primaryColor: string
    /** Basic border radius for elements with rounded corners.
     * In px.
     */
    borderRadius: number
    /** If the consentbar is dismissable without consent actions
     */
    dismissable: boolean
    /** Type of action to dismiss consentbar
     * 
     */
    dismissType: 'cross' | 'cross-faint' | 'text'
    /** Period after which consentbar is shown again. Regardless of consent statuses.
     * In days.
     */
    expiration: number
    /** Type of the closing action for Precen. 
     */
    closeType?: 'cross' | 'tab'
  }