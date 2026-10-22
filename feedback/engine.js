/* Deliberately local and deterministic. These are prompts, not AI findings. */
(function (root) {
  'use strict';
  const themes = {
    hierarchy: { name: 'Visual hierarchy', cue: /\b(busy|clutter|crowded|spacing|layout|overwhelming|too much|too many|stand out|visual hierarchy)\b/i, concern: 'People may be unsure where to focus because elements compete for attention.', question: 'Which element drew your attention first, and what were you trying to find?', options: [
      ['Clarify the focal point', 'Give the primary action stronger emphasis. Reduce the weight of secondary elements without removing the visual character.', 'Keeps the composition and personality largely intact.', 'May not resolve a genuinely overloaded screen.', 'Ask a participant to identify the next action without prompting.'],
      ['Create a calmer structure', 'Group related elements, introduce breathing room, and organize content into a clear sequence.', 'Keeps the content while changing how it is organized.', 'Requires more layout work and may change familiar patterns.', 'Compare how easily participants find a specific item in both layouts.'],
      ['Reveal detail on demand', 'Show essential information first and move secondary detail into an expandable section.', 'Preserves richer content without showing everything at once.', 'Hidden content can be missed; extra interactions may slow people down.', 'Check whether people discover and use the secondary details.']
    ] },
    flow: { name: 'Navigation & next steps', cue: /\b(navigat\w*|where to start|next step|where.*click|find.*button|lost|back button|user flow|menu|checkout|submit|sign.?up)\b/i, concern: 'People may not know where to go next or how to complete their task.', question: 'What were you trying to do, and at which step did you become unsure?', options: [
      ['Make the next step explicit', 'Use a specific action label and a short cue explaining what happens next.', 'Keeps the existing flow with a focused clarification.', 'Clear labels cannot fix an unnecessary or missing step.', 'Ask participants what they expect before clicking the action.'],
      ['Reshape the task path', 'Reorder or combine steps around the user’s task. Keep a visible way to go back.', 'Preserves the goal while simplifying the route to it.', 'Changes learned navigation and needs broader testing.', 'Observe task completion, wrong turns, and requests for help.'],
      ['Add contextual guidance', 'Add a short orientation cue, example, or progress indicator at the point of uncertainty.', 'Keeps the current structure and adds support where it is needed.', 'Guidance can become visual noise or mask a confusing flow.', 'Check whether first-time users proceed without facilitator help.']
    ] },
    content: { name: 'Content & clarity', cue: /\b(unclear|wording|jargon|copy|text|label|instructions|understand|confusing|meaning|explain|information|headline)\b/i, concern: 'People may not understand the message, labels, or information they need to act.', question: 'Which phrase was unclear, and how would you describe it in your own words?', options: [
      ['Rewrite the unclear moment', 'Replace the specific ambiguous label or sentence with concrete, task-focused language.', 'Keeps the tone and structure while making the meaning clearer.', 'A wording change may not address missing context.', 'Ask someone to explain the revised wording in their own words.'],
      ['Reorganize the information', 'Lead with what people need to know, then group supporting details under descriptive headings.', 'Preserves content while making it easier to scan.', 'May require changes to layout and content ownership.', 'Ask people to find and explain a key piece of information.'],
      ['Show a concrete example', 'Use a short example or preview to explain what an action or concept means.', 'Keeps the concept while making it more tangible.', 'A poorly chosen example may imply the wrong limits or expectations.', 'Check whether participants can apply the example to a new scenario.']
    ] },
    access: { name: 'Accessibility & readability', cue: /\b(contrast|readab\w*|small.*(font|text)|font.*small|can.t read|keyboard|screen reader|accessib\w*|color.?blind|colour.?blind|alt text|focus indicator)\b/i, concern: 'Some people may have difficulty perceiving or operating part of the interface.', question: 'Which element is difficult to read or use, and with which device or input method?', options: [
      ['Repair the specific barrier', 'Investigate the reported element and adjust its contrast, size, focus behavior, or label as appropriate.', 'Keeps the broader visual direction while addressing a concrete barrier.', 'One repair does not establish accessibility across the experience.', 'Retest the reported task with the relevant input method or assistive technology.'],
      ['Improve the shared pattern', 'Update the repeated component or design token behind the issue, then review every place it appears.', 'Carries the design language into a more usable shared system.', 'A shared change can introduce regressions in other contexts.', 'Check representative screens and states after changing the shared pattern.'],
      ['Explore an equivalent interaction', 'Prototype an alternative way to complete the same task when the current interaction creates a barrier.', 'Preserves the user goal while reconsidering the interaction.', 'Requires testing for equivalence and discoverability.', 'Ask affected users to complete the same task using the alternative.']
    ] },
    performance: { name: 'Speed & system feedback', cue: /\b(slow|loading|load time|lag|freeze|frozen|error|crash|response time|nothing happens)\b/i, concern: 'People may experience delays or lack clear feedback about the system’s state.', question: 'What action triggered this, how long did it take, and what did the interface show?', options: [
      ['Make the state visible', 'Show a clear loading, success, or error state with a useful next step.', 'Preserves the interaction while reducing uncertainty.', 'Better messaging does not fix the underlying delay or failure.', 'Check whether participants understand the state and how to recover.'],
      ['Investigate the bottleneck', 'Reproduce the issue and work with engineering to identify the slow or failing part of the task.', 'Preserves the intended flow while targeting its reliability.', 'The cause may be technical and require work beyond the interface.', 'Repeat the same task under the conditions that produced the issue.'],
      ['Make recovery easier', 'Preserve entered work and provide a clear retry or alternative path after a failure.', 'Protects user progress and supports task completion.', 'Recovery patterns add states that need careful testing.', 'Simulate a failure and check that people can recover without losing work.']
    ] },
    preserve: { name: 'What to preserve', cue: /\b(love|like|great|helpful|beautiful|works well|keep|easy|intuitive|clear)\b/i, concern: 'This comment may identify something worth preserving; confirm whether it also contains a concern.', question: 'What specifically worked well, and why was it helpful to you?', options: [
      ['Protect the strength', 'Name the successful element and make it an explicit constraint for the next revision.', 'Directly protects a valued part of the concept.', 'Positive feedback from one person may not generalize.', 'Confirm that the element supports the intended task for other users.'],
      ['Extend the useful pattern', 'Apply the successful pattern to one related moment and test its usefulness there.', 'Builds on the existing visual or interaction language.', 'A pattern that works in one context may not transfer.', 'Compare the original and new context with a relevant task.'],
      ['Validate before changing', 'Keep the element as it is and gather more evidence before making a revision.', 'Preserves the current design until there is a clear reason to change it.', 'Waiting could delay an improvement if contrary evidence emerges.', 'Seek both positive and negative examples across multiple participants.']
    ] },
    clarify: { name: 'Needs more context', cue: null, concern: 'There is not enough specific evidence yet to identify the design problem.', question: 'Can you show the exact moment and explain what you expected to happen?', options: [
      ['Ask a focused follow-up', 'Ask the reviewer to point to the specific element, task, and expected outcome before proposing a fix.', 'Avoids changing the concept based on a vague interpretation.', 'Requires another conversation and may slow the next revision.', 'Record a concrete example and confirm your understanding with the reviewer.'],
      ['Observe the task', 'Watch someone try the relevant task without coaching and note the point of difficulty.', 'Grounds revisions in observed behavior rather than assumptions.', 'Requires access to a representative participant and a testable prototype.', 'Compare what the person said with what happened during the task.'],
      ['Test a small hypothesis', 'Make one reversible change based on an explicitly stated hypothesis, keeping the original for comparison.', 'Limits change while keeping the original direction available.', 'The hypothesis may be wrong; avoid treating the result as proof from one test.', 'Define what would support or contradict the hypothesis before testing.']
    ] }
  };
  function splitFeedback(text) { return text.split(/\r?\n/).map(s => s.trim()).filter(Boolean); }
  function classify(text) {
    const matches = Object.keys(themes).filter(k => k !== 'preserve' && themes[k].cue && themes[k].cue.test(text));
    // Specific access barriers take precedence over generic mentions of text/layout.
    if (matches.includes('access')) matches.unshift(matches.splice(matches.indexOf('access'), 1)[0]);
    if (!matches.length && themes.preserve.cue.test(text) && !/\b(not|isn.t|aren.t|don.t|doesn.t|but|however)\b/i.test(text)) matches.push('preserve');
    return { theme: matches[0] || 'clarify', matches, review: /\b(not|isn.t|aren.t|don.t|doesn.t|but|however)\b/i.test(text) || matches.length !== 1 };
  }
  function analyze(text) {
    const lines = splitFeedback(text);
    if (!lines.length || lines.length > 100 || text.length > 20000) throw new Error('Enter between 1 and 100 comments, up to 20,000 characters.');
    return lines.map((quote, index) => ({ id: index + 1, quote, ...classify(quote) }));
  }
  function validWorkspace(data) {
    const str = (x, max) => typeof x === 'string' && x.length <= max;
    if (!data || data.version !== 1 || !['capture','sense','compare','decide'].includes(data.step) || typeof data.demo !== 'boolean') return false;
    if (!str(data.project,120) || !str(data.intent,2000) || !str(data.audience,300) || !str(data.feedback,20000)) return false;
    if (!Array.isArray(data.comments) || data.comments.length>100 || !data.comments.every(c=>c&&Number.isInteger(c.id)&&str(c.quote,20000)&&Object.hasOwn(themes,c.theme)&&Array.isArray(c.matches)&&c.matches.every(k=>Object.hasOwn(themes,k))&&typeof c.review==='boolean')) return false;
    if (!data.notes || typeof data.notes!=='object' || Array.isArray(data.notes) || !Object.entries(data.notes).every(([k,n])=>Object.hasOwn(themes,k)&&n&&str(n.concern,2000)&&['Review','High','Medium','Low'].includes(n.priority))) return false;
    if (!Array.isArray(data.decisions) || data.decisions.length>100 || !data.decisions.every(d=>d&&str(d.id,100)&&str(d.date,100)&&str(d.project,120)&&str(d.intent,2000)&&str(d.theme,100)&&str(d.concern,2000)&&str(d.title,200)&&str(d.action,3000)&&str(d.rationale,3000)&&str(d.test,3000)&&str(d.status,100)&&Array.isArray(d.quotes)&&d.quotes.length<=100&&d.quotes.every(q=>str(q,20000)))) return false;
    if (!Object.hasOwn(themes,data.focus)) return false;
    if (data.selection !== null && (!data.selection || !Object.hasOwn(themes,data.selection.theme) || !Number.isInteger(data.selection.index) || data.selection.index<0 || data.selection.index>2)) return false;
    if (!data.draft || !['title','action','rationale','test'].every(k=>str(data.draft[k],k==='title'?200:3000))) return false;
    if (data.analyzed !== null && (!data.analyzed || !str(data.analyzed.project,120)||!str(data.analyzed.intent,2000)||!str(data.analyzed.audience,300)||!str(data.analyzed.feedback,20000))) return false;
    if (new Set(data.comments.map(c=>c.id)).size!==data.comments.length || data.comments.some(c=>c.id<1)) return false;
    if (new Set(data.decisions.map(d=>d.id)).size!==data.decisions.length || data.decisions.some(d=>!['Planned','In progress','Tested — keep','Tested — revisit','Deferred'].includes(d.status))) return false;
    if (data.comments.length && !data.analyzed) return false;
    if (data.selection && !data.comments.some(c=>c.theme===data.selection.theme)) return false;
    return true;
  }
  const api = { themes, splitFeedback, classify, analyze, validWorkspace };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FeedbackEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
