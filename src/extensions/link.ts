import { Plugin, TextSelection } from 'prosemirror-state';
import { Link as TiptapLink } from 'tiptap-extensions';
// @ts-ignore
import { getMarkRange } from 'tiptap-utils';
import { MenuData } from 'tiptap';
import { MenuBtnView } from '@/../types';
import AddLinkCommandButton from '@/components/MenuCommands/Link/AddLinkCommandButton.vue';

export default class Link extends TiptapLink implements MenuBtnView {
  get plugins () {
    return [
      new Plugin({
        props: {
          handleClick (view, pos) {
            const { schema, doc, tr } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.link);

            if (!range) return false;

            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);

            const transaction = tr.setSelection(new TextSelection($start, $end));

            view.dispatch(transaction);
            return true;
          },
        },
      }),
    ];
  }

  menuBtnView (editorContext: MenuData) {
    return {
      component: AddLinkCommandButton,
      componentProps: {
        editorContext,
      },
    };
  }
}
