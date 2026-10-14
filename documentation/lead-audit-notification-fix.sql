-- Applied to production through Supabase migration fix_wavlon_notification_types
-- on 2026-10-14. All previous values preserved; no RLS or privilege changes.
-- The notification trigger already emits these types. Rejecting them rolled back leads.
ALTER TABLE public.notifications DROP CONSTRAINT notifications_type_check;
ALTER TABLE public.notifications ADD CONSTRAINT notifications_type_check CHECK (type = ANY (ARRAY['mention'::text, 'comment_reply'::text, 'task_assigned'::text, 'task_completed'::text, 'lead_assigned'::text, 'opportunity_update'::text, 'new_website_lead'::text, 'wavlon_lead'::text, 'work_order_assigned'::text, 'service_request'::text, 'incoming_call'::text, 'chat_handoff'::text, 'wavlon_quote'::text, 'wavlon_contact'::text]));
