import ForgeUI, {
  render,
  useState,
  Button,
  Text,
  Fragment,
  IssuePanel,
} from '@forge/ui';

import api from "@forge/api";
import { useIssueProperty } from '@forge/ui-jira';

import Tabs from './Tabs'
import DesignMockup from './DesignMockup'
import Mockup from './Mockup'
import DesignParser from './DesignParser'

const App = () => {
  const [pages, setPages] = useIssueProperty("pages", []);
  const [viewPage, setViewPage] = useState(function() {
    if (pages && pages.length) {
      let page = pages[0]
      page.content = DesignParser(page.design)
      return page
    }
    return null
  });
  const [editPage, setEditPage] = useState(null);
  const [addPage, setAddPage] = useState(false);

  const enableAddPage = function() {
    setAddPage(true)
    setViewPage(null)
  }

  const enableViewPage = function(page) {
    page.content = DesignParser(page.design)
    setViewPage(page)
  }

  const enableEditPage = (page) => {
    setEditPage(page)
    setViewPage(null)
  }

  const gotoPage = function(page) {

    let filteredPages = pages.filter(item => item.alias == page.page)
    if (filteredPages.length == 0) {
      return
    }

    enableViewPage(filteredPages[0])
  }

  const onClose = function(page) {
    setEditPage(null)
    setAddPage(false)

    if (page) {
      enableViewPage(page)
    }
  }

  return (
    <Fragment>
      {!editPage && !addPage && <Tabs pages={pages} addPage={() => enableAddPage()} viewPage={(page) => enableViewPage(page)}/>}
      {viewPage && <Mockup page={viewPage} gotoPage={gotoPage} onEdit={(page) => enableEditPage(page)}/>}
      {editPage && <DesignMockup pages={pages} setPages={setPages} page={editPage} onClose={onClose}/>}
      {addPage && <DesignMockup pages={pages} setPages={setPages} onClose={onClose}/>}
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
