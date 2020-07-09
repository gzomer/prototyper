import ForgeUI, {
  Text,
  Fragment,
  ButtonSet,
  Button,
  Image,
  useState
} from '@forge/ui';

import { useIssueProperty } from '@forge/ui-jira';

import SVGView from './SVGView'
import HTML from './HTML'
import Device from './Device'

const MobileMockup = ({page, onEdit, gotoPage}) => {
	const [layout, setLayout] = useState('mobile')

	const getActions = () => {
		let actions = page.content.widgets.filter(item => item.goto).map(item => {
			return {
				page: item.goto,
				name: item.label || item.title || item.defaultValue || item.widgetType
			}
		})

		page.content.widgets.filter(item => item.innerWidgets).map(item => {
			item.innerWidgets.filter(item => item.goto).map(inner => {

				actions.push({
					page: inner.goto,
					name: inner.label || item.title || inner.defaultValue || inner.widgetType
				})
			})
		})

		return actions
	}

	const actions = getActions()

	return (
		<Fragment>
			<SVGView content={Device(page.content, layout)}/>
			{onEdit && actions && actions.length > 0 && <Fragment>
				<Text content="Interactions"></Text>
				<ButtonSet>
					{actions.map(action => (
						<Button text={"Click " + action.name} onClick={() => gotoPage(action)}/>
					))}
				</ButtonSet>
				<HTML.HR/>
			</Fragment>}

			<Text content="Layout"></Text>
			<ButtonSet>
				<Button text="Mobile" onClick={() => setLayout('mobile')}/>
				<Button text="Desktop" onClick={() => setLayout('desktop')}/>
			</ButtonSet>
			<HTML.HR/>
		</Fragment>
	)
}

const Mockup = ({page, onEdit, gotoPage}) => {
	return (
		<Fragment>
			{onEdit && <HTML.H2 text={page.name}/>}
			<MobileMockup page={page} onEdit={onEdit} gotoPage={gotoPage}/>
			{onEdit && <Button onClick={() => onEdit(page)} text="Edit"/>}
		</Fragment>
	)
}

export default Mockup