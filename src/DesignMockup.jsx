import ForgeUI, {
  useState,
  Text,
  Fragment,
  ButtonSet,
  Button,
  Form,
  Select,
  Option,
  TextArea,
  TextField,
  ModalDialog,
} from '@forge/ui';

import { useIssueProperty } from '@forge/ui-jira';

import HTML from './HTML'
import Mockup from './Mockup'
import Templates from './Templates'
import DesignParser from './DesignParser'

const DesignMockup = ({page, onClose, pages, setPages}) => {
	const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
	const [pageDesign, setPageDesign] = useState(page && page.design || '')
	const [pageTemplate, setPageTemplate] = useState('own')
	const [pageName, setPageName] = useState(page && page.name || '')
	const [pageAlias, setPageAlias] = useState(page && page.alias || '')
	const [editedPage, setEditedPage] = useState(() => {return {content:DesignParser(pageDesign)}})

	const templates = [
		{'id': 'own', 'name': 'Empty', selected: true},
		{'id': 'login', 'name': 'Login'},
		{'id': 'signup', 'name': 'Signup'},
		{'id': 'cards', 'name': 'Cards'},
		{'id': 'details', 'name': 'Details'},
		{'id': 'order', 'name': 'Order'},
		{'id': 'checkout', 'name': 'Checkout'},
		{'id': 'list', 'name': 'List'},
		{'id': 'tabs', 'name': 'Tabs'},
		{'id': 'menu', 'name': 'Menu'},
		{'id': 'forms', 'name': 'Forms'},
		{'id': 'search', 'name': 'Search'},
	]

	const uuidv4 = () => {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const parseDesign = (design) => {
		setEditedPage({content: DesignParser(design)})
	}

	const parseFormData = (formData) => {
		setPageName(formData.name)
		setPageAlias(formData.alias)

		let design = formData.design

		if (formData.template != 'own' && formData.template != pageTemplate) {
			let template = Templates.getById(formData.template)

			if (template) {
				design = template
			}
		}

		setPageTemplate(formData.template)
		setPageDesign(design)
		parseDesign(design)

		return formData
	}

	const savePage = async function() {
		let viewPageAfter = null
		let newPages = pages;
		if (page && page.id) {
			newPages = pages.map(item => {
				if (item.id == page.id) {
					let newPage = {
						name: pageName,
						alias: pageAlias,
						design: pageDesign
					}
					viewPageAfter = Object.assign(item, newPage)

					return viewPageAfter
				}
				return item
			})
		} else {
			let newPage = {
				id: uuidv4(),
				name: pageName,
				alias: pageAlias,
				design: pageDesign
			}
			newPages = [...pages, newPage]
			viewPageAfter = newPage
		}

		await setPages(newPages)
		onClose(viewPageAfter)
	}

	const removePage = async function() {
		let newPages = pages.filter(item => item.id != page.id)
		await setPages(newPages)

		if (newPages.length > 0) {
			onClose(newPages[0])
		} else {
			onClose(null)
		}
	}

	return (
		<Fragment>
			{page && <HTML.H1 text={'Editing ' + page.name}/>}
			{!page && <HTML.H1 text="Adding page"/>}

			<Form onSubmit={(formData) => parseFormData(formData)} submitButtonText="Update">
				<TextField autoComplete="off" label="Name" name="name" defaultValue={pageName}/>
				<TextField autoComplete="off" label="Alias" name="alias" defaultValue={pageAlias}/>
				<Text>Page alias is a reference to be used for interactions</Text>
				<Select label="Template" name="template">
					{templates.map(template => (
						<Option defaultSelected={template.selected} label={template.name} value={template.id} />
					))}
				</Select>
          		<TextArea autoComplete="off"  label="Page design" name="design" defaultValue={pageDesign}/>
        	</Form>

        	{isRemoveModalOpen && (
	        <ModalDialog header="Do you confirm removing the page?" onClose={() => setRemoveModalOpen(false)}>
	          <Form
	          	submitButtonText="Remove"
	            onSubmit={data => {
	              setRemoveModalOpen(false)
	              return removePage()
	            }}
	          >
	          </Form>
	        </ModalDialog>
	        )}

        	<Mockup page={editedPage}/>

        	<ButtonSet>
				<Button onClick={() => savePage()} text="Save"/>
				<Button onClick={() => onClose(page)} text="Close"/>
				{page && page.id && <Button onClick={() => setRemoveModalOpen(true)} text="Remove"/>}

			</ButtonSet>
		</Fragment>
	)
}

export default DesignMockup