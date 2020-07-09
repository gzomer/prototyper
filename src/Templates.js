const loginTemplate = `
:title My App align=center top=60 bottom=60

:input Email
:input Password
:button Login
:link I don't have an account
`

const signupTemplate = `
:title My App align=center top=60 bottom=60

:input Name
:input Email
:input Password
:input Confirm password
:button Sign up
:link I have an account
`

const cardsTemplate = `
:header Events right=search left=bars

:card title=Pink Floyd subtitle=The best show of the year image=show

:tab Favorite icon=list
:tab Promos icon=percent
:tab Weekend icon=calendar
:tab Favorites icon=star
`

const tabsTemplate = `
:header Events right=search left=bars

:tab Favorite icon=list
:tab Promos icon=percent
:tab Weekend icon=calendar
:tab Favorites icon=star
`

const formsTemplate = `
:header Forms
:separator 50

:input My text input
:checkbox My checkbox
:radio My radio input
 :option Option 2 active=true
 :option Option 2
 :option Option 3

:select My select field
:button Submit
`

const menuTemplate = `
:header Events right=search left=bars

:menu Menu
 :item Profile
 :item Settings
 :item Notifications
 :item Logout

:card title=Pink Floyd subtitle=The best show of the year image=show

:tab Favorite icon=list
:tab Promos icon=percent
:tab Weekend icon=calendar
:tab Favorites icon=star`

const detailsTemplate = `
:header Pink Floyd left=chevron-left

:image type=show

:title Pink Floyd
:label This is the best show of the year

:list
 :item Stall subtitle=$140 right=chevron-down
 :item Boxes subtitle=$200 right=chevron-down
 :item VIP subtitle=$599 right=chevron-down

:button Checkout`

const checkoutTemplate = `
:header Checkout left=chevron-left

:title Pink Floyd
:list
 :item Stall x 2 right=$280
 :item Boxes x 1 right=$200
 :item Total right=$480

:input Name on card
:input Card number
:input Security code
:input Expiry date placeholder=MM/YY

:button Buy background=green
`

const orderTemplate = `
:header Order #1293

:title Pink Floyd
:list
 :item Stall x 2 right=$280
 :item Boxes x 1 right=$200
 :item Total right=$480

:title Your order has been confirmed!

:button Find more events`

const searchTemplate = `
:header Filter
:search Search events

:list
 :item Pink Floyd
 :item Queen
 :item Guns N'Roses
`

const listTemplate = `
:header Settings

:list Notifications
 :item New events
 :item Promotions

:list Profile
 :item Change picture
 :item Change name
 :item Change password
 :item Logout
`

const templates = {
	'login' : loginTemplate,
	'signup' : signupTemplate,
	'cards' : cardsTemplate,
	'tabs' : tabsTemplate,
	'details' : detailsTemplate,
	'menu' : menuTemplate,
	'forms' : formsTemplate,
	'list' : listTemplate,
	'search' : searchTemplate,
	'checkout' : checkoutTemplate,
	'order' : orderTemplate,

}


const Templates = {
	getById: (id) => templates[id]
}

export default Templates