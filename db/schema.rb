# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171006094738) do

  create_table "action_log", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "create_user", limit: 36, null: false
    t.string "update_user", limit: 36, null: false
    t.date "create_date", null: false
    t.date "update_date", null: false
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "attendant_uuid", limit: 36, null: false
    t.string "class_name", limit: 128
    t.string "function_name", limit: 128
    t.string "parameter", limit: 4000
  end

  create_table "application_head", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date", null: false
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "name", limit: 100, null: false
    t.string "description", limit: 500
    t.string "id", limit: 100, default: "1", null: false
    t.string "web_site", limit: 500
    t.string "create_user", limit: 36
    t.string "update_user", limit: 36
    t.index ["id"], name: "application_head_uk2", unique: true
    t.index ["name"], name: "application_head_uk1", unique: true
  end

  create_table "appmenu", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "is_active", limit: 1, default: "Y", null: false
    t.date "create_date", null: false
    t.string "create_user", limit: 36, null: false
    t.date "update_date"
    t.string "update_user", limit: 36
    t.string "name_zh_tw", limit: 200, null: false
    t.string "name_zh_cn", limit: 200, null: false
    t.string "name_en_us", limit: 200, null: false
    t.string "id", limit: 100, null: false
    t.string "appmenu_uuid", limit: 36
    t.string "haschild", limit: 1, default: "N", null: false
    t.string "application_head_uuid", limit: 36, null: false
    t.decimal "ord", null: false
    t.string "parameter_class", limit: 200
    t.string "image", limit: 100
    t.string "sitemap_uuid", limit: 36
    t.string "action_mode", limit: 50
    t.string "is_default_page", limit: 1, default: "N"
    t.string "is_admin", limit: 1, default: "N"
    t.string "name_jpn", limit: 200
    t.index ["application_head_uuid", "id", "action_mode"], name: "appmenu_uk2", unique: true
    t.index ["application_head_uuid", "id"], name: "appmenu_uk1", unique: true
  end

  create_table "appmenu_proxy_map", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "proxy_uuid", limit: 36, null: false
    t.string "appmenu_uuid", limit: 36, null: false
  end

  create_table "apppage", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "is_active", limit: 1, default: "Y", null: false
    t.date "create_date", null: false
    t.string "create_user", limit: 36, null: false
    t.date "update_date"
    t.string "update_user", limit: 36
    t.string "id", limit: 100, null: false
    t.string "name", limit: 200, null: false
    t.string "description", limit: 500
    t.string "url", limit: 200, null: false
    t.string "parameter_class", limit: 200
    t.string "application_head_uuid", limit: 36, null: false
    t.string "p_mode", limit: 100
    t.string "runjsfunction", limit: 200
    t.index ["application_head_uuid", "id"], name: "apppage_uk1", unique: true
    t.index ["application_head_uuid", "name", "url", "p_mode", "parameter_class"], name: "apppage_uk2", unique: true
  end

  create_table "attendant", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "company_uuid", limit: 36, null: false
    t.string "account", limit: 50, null: false
    t.string "c_name", limit: 100
    t.string "e_name", limit: 100
    t.string "email", limit: 300, null: false
    t.string "password", limit: 50
    t.string "is_supper", limit: 1, default: "N", null: false
    t.string "is_admin", limit: 1, default: "N", null: false
    t.string "code_page", limit: 10, default: "TW", null: false
    t.string "department_uuid", limit: 36
    t.string "phone", limit: 50
    t.string "site_uuid", limit: 36
    t.string "gender", limit: 1, default: "M"
    t.date "birthday"
    t.date "hire_date"
    t.date "quit_date"
    t.string "is_manager", limit: 1, default: "N"
    t.string "is_direct", limit: 1, default: "N"
    t.string "grade", limit: 10
    t.string "id", limit: 100
    t.string "src_uuid", limit: 36
    t.string "is_default_pass", limit: 1, default: "Y"
    t.string "picture_url", limit: 100
    t.index ["company_uuid", "account"], name: "attendant_uk1", unique: true
    t.index ["company_uuid", "id"], name: "attendant_idx1"
    t.index ["src_uuid"], name: "attendant_idx2"
  end

  create_table "cal", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "frame_head_uuid", limit: 26
    t.string "time_id", limit: 6
    t.string "kpi_head_uuid", limit: 36
    t.decimal "ord"
    t.string "status", limit: 1, default: "W"
    t.string "error_msg", limit: 2000
    t.decimal "value"
    t.string "formula", limit: 800
    t.string "cal_log"
    t.decimal "frame_level"
    t.decimal "manually", default: "0.0"
    t.string "files_group_id", limit: 36
    t.decimal "files_count"
    t.string "user_desc"
    t.decimal "check_status", default: "0.0"
    t.string "check_attendant_uuid", limit: 36
    t.date "check_time"
    t.string "check_desc"
    t.index ["frame_head_uuid", "kpi_head_uuid", "status"], name: "inx_cal_01"
    t.index ["frame_head_uuid", "time_id", "kpi_head_uuid", "status"], name: "inx_cal_02"
    t.index ["frame_head_uuid", "time_id"], name: "inx_cal_03"
  end

  create_table "chart_list", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "chart_name", limit: 200
    t.string "chart_desc", limit: 4000
    t.string "chart_title", limit: 200
    t.string "chart_type", limit: 200
    t.string "chart_x", limit: 4000
    t.string "chart_y", limit: 4000
    t.string "chart_time", limit: 4000
    t.string "attendant_uuid", limit: 36
    t.string "display", limit: 36
    t.string "jobject", limit: 4000
    t.string "company_uuid", limit: 36
    t.date "create_date"
    t.string "chart_group", limit: 200
  end

  create_table "company", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "class", limit: 10, null: false
    t.string "id", limit: 100, null: false
    t.string "c_name", limit: 100
    t.string "e_name", limit: 100
    t.string "voucher_point_uuid", limit: 36
    t.decimal "week_shift", default: "0.0"
    t.string "ou_sync_type", limit: 1, default: "F"
    t.string "name_zh_cn", limit: 128
    t.string "concurrent_user", limit: 128
    t.date "expired_date"
    t.string "sales_attendant_uuid", limit: 36
    t.string "is_sync_ad_user", limit: 1, default: "N"
    t.string "ad_ldap", limit: 400, default: ""
    t.string "ad_ldap_user", limit: 400, default: ""
    t.string "ad_ldap_user_password", limit: 50, default: ""
    t.index ["id"], name: "company_uk1", unique: true
  end

  create_table "dwg", primary_key: ["dwg_gid", "attendant_uuid"], force: :cascade do |t|
    t.string "dwg_gid", limit: 36, null: false
    t.string "attendant_uuid", limit: 36, null: false
    t.string "is_finish", limit: 1, default: "N"
  end

  create_table "error_log", primary_key: "uuid", id: :string, limit: 32, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, null: false
    t.string "error_code", limit: 32, null: false
    t.string "error_time", limit: 32, null: false
    t.string "error_message", limit: 3000, null: false
    t.string "application_name", limit: 32, null: false
    t.string "attendant_uuid", limit: 32
    t.string "error_type", limit: 32
    t.string "is_read", limit: 1, default: "N"
  end

  create_table "files", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "files_group_id", limit: 36
    t.string "file_name", limit: 200
    t.string "system_path", limit: 200
  end

  create_table "frame_category", primary_key: "uuid", id: :string, limit: 45, force: :cascade do |t|
    t.string "frame_category_name", limit: 100
  end

  create_table "frame_head", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "company_uuid", limit: 20, null: false
    t.string "c_name", limit: 100, null: false
    t.string "e_name", limit: 100
    t.string "parent_frame_head_uuid", limit: 36
    t.decimal "ord", default: "0.0", null: false
    t.string "region_uuid", limit: 36
    t.string "frame_id", limit: 100
    t.string "full_frame_uuid_list", limit: 4000
    t.decimal "dlevel"
    t.string "zh_name", limit: 100
    t.string "full_frame_name_list", limit: 4000
    t.string "full_frame_id_list", limit: 4000
    t.string "kpi_package_uuid", limit: 45
    t.string "haschild", limit: 1, default: "N"
    t.string "frame_category_uuid", limit: 45
    t.string "currency", limit: 20
  end

  create_table "frame_item", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "frame_head_uuid", limit: 36, null: false
    t.string "raw_head_uuid", limit: 36, null: false
    t.decimal "ord"
    t.string "pwg1_gid", limit: 36, comment: "PLANT WORKER GROUP"
    t.string "pwg2_gid", limit: 36, comment: "PLANT WORKER GROUP"
    t.string "pwg3_gid", limit: 36, comment: "PLANT WORKER GROUP"
    t.string "pwg4_gid", limit: 36, comment: "PLANT WORKER GROUP"
    t.string "pwg5_gid", limit: 36, comment: "PLANT WORKER GROUP"
    t.string "pwg1_show", limit: 400
    t.string "pwg2_show", limit: 400
    t.string "pwg3_show", limit: 400
    t.string "pwg4_show", limit: 400
    t.string "pwg5_show", limit: 400
    t.string "skip", limit: 1, default: "N"
    t.string "skip_result", limit: 400
    t.decimal "last_flow"
  end

  create_table "group_appmenu", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "is_active", limit: 1, default: "Y", null: false
    t.date "create_date", null: false
    t.string "create_user", limit: 36, null: false
    t.date "update_date"
    t.string "update_user", limit: 36
    t.string "appmenu_uuid", limit: 36, null: false
    t.string "group_head_uuid", limit: 36, null: false
    t.string "is_default_page", limit: 1, default: "N", null: false
    t.index ["group_head_uuid", "appmenu_uuid"], name: "group_appmenu_uk1", unique: true
  end

  create_table "group_attendant", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "is_active", limit: 1, null: false
    t.date "create_date", null: false
    t.string "create_user", limit: 36, null: false
    t.date "update_date"
    t.string "update_user", limit: 36
    t.string "group_head_uuid", limit: 36, null: false
    t.string "attendant_uuid", limit: 36, null: false
    t.index ["group_head_uuid", "attendant_uuid"], name: "group_attendant_uk1", unique: true
  end

  create_table "group_head", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date", null: false
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "name_zh_tw", limit: 200, null: false
    t.string "name_zh_cn", limit: 200, null: false
    t.string "name_en_us", limit: 200, null: false
    t.string "company_uuid", limit: 36, null: false
    t.string "id", limit: 100, null: false
    t.string "create_user", limit: 36, null: false
    t.string "update_user", limit: 36
    t.string "application_head_uuid", limit: 36, null: false
    t.index ["id", "company_uuid", "application_head_uuid"], name: "group_head_uk1", unique: true
  end

  create_table "kpi_formula", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "kpi_head_uuid", limit: 36, null: false
    t.string "time_id", limit: 6, null: false
    t.string "algorithm", limit: 4000
    t.string "description", limit: 500
    t.string "algorithm_man", limit: 4000
    t.string "jss", limit: 4000
    t.index ["kpi_head_uuid", "time_id"], name: "kpi_formula_uk1", unique: true
  end

  create_table "kpi_head", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "company_uuid", limit: 36, null: false
    t.string "kpi_id", limit: 32, null: false
    t.string "c_desc", limit: 300
    t.string "e_desc", limit: 300
    t.string "unit", limit: 50
    t.decimal "degree"
    t.string "c_notice", limit: 800
    t.decimal "signal", default: "2.0"
    t.string "time_type", limit: 6, default: "month", null: false
    t.string "c_desc_group", limit: 10
    t.string "e_desc_group", limit: 10
    t.string "include_kpi", limit: 1, default: "N", null: false
    t.decimal "calculte_ord"
    t.string "need_summary", limit: 1, default: "Y", null: false
    t.string "need_security", limit: 1, default: "N", null: false
    t.string "zh_desc", limit: 300
    t.string "e_notice", limit: 800
    t.string "need_avg", limit: 1, default: "N"
    t.string "avg_type", limit: 1
    t.string "zh_notice", limit: 300
    t.string "aliases", limit: 100
    t.index ["company_uuid", "kpi_id"], name: "uk_company_kpiid", unique: true
    t.index ["kpi_id", "is_active", "time_type"], name: "kpi_head_ixd_01"
  end

  create_table "kpi_package", primary_key: "uuid", id: :string, limit: 45, force: :cascade do |t|
    t.string "company_uuid", limit: 45
    t.string "name", limit: 200
    t.string "scope_month_id", limit: 100
    t.index ["company_uuid", "name"], name: "uk_kp_companyuuid_name", unique: true
  end

  create_table "kpi_package_expend", primary_key: "uuid", id: :string, limit: 45, force: :cascade do |t|
    t.string "kpi_package_uuid", limit: 45
    t.string "kpi_package_item_uuid", limit: 45
    t.string "raw_head_uuid", limit: 45
    t.string "kpi_head_uuid", limit: 45
  end

  create_table "kpi_package_item", primary_key: "uuid", id: :string, limit: 45, force: :cascade do |t|
    t.string "kpi_package_uuid", limit: 45, null: false
    t.string "kpi_head_uuid", limit: 45, null: false
  end

  create_table "matt_users", force: :cascade do |t|
    t.string "user_name"
    t.string "title"
    t.string "tel"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "parameter_head", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "name", limit: 200, null: false
    t.string "description", limit: 500
    t.decimal "value", default: "1.0"
    t.string "company_uuid", limit: 36
    t.string "is_public", limit: 1, default: "Y", null: false
    t.index ["name"], name: "parameter_head_uk1", unique: true
  end

  create_table "parameter_item", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "parameter_head_uuid", limit: 36, null: false
    t.string "region_uuid", limit: 36, null: false
    t.string "description", limit: 500
    t.decimal "value", default: "1.0"
    t.index ["parameter_head_uuid", "region_uuid"], name: "parameter_item_uk1", unique: true
  end

  create_table "parameter_month", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "parameter_item_uuid", limit: 36, null: false
    t.string "month_id", limit: 6, null: false
    t.string "description", limit: 500
    t.decimal "value", default: "1.0", null: false
    t.index ["parameter_item_uuid", "month_id"], name: "parameter_month_uk1", unique: true
  end

  create_table "proxy", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "proxy_action", limit: 400, null: false
    t.string "proxy_method", limit: 400, null: false
    t.string "description", limit: 400, null: false
    t.string "proxy_type", limit: 50, null: false
    t.string "need_redirect", limit: 1, default: "N", null: false
    t.string "redirect_proxy_action", limit: 400
    t.string "redirect_proxy_method", limit: 400
    t.string "application_head_uuid", limit: 36, null: false
    t.string "redirect_src", limit: 400
  end

  create_table "pwg", id: false, force: :cascade do |t|
    t.string "gid", limit: 36
    t.string "attendant_uuid", limit: 36
    t.index ["gid", "attendant_uuid"], name: "uk_pwg", unique: true
  end

  create_table "raw_head", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y", null: false
    t.string "company_uuid", limit: 36, null: false
    t.string "raw_id", limit: 20, null: false
    t.string "raw_category_uuid", limit: 50
    t.string "c_desc", limit: 500
    t.string "e_desc", limit: 500
    t.string "c_define", limit: 500
    t.string "e_define", limit: 500
    t.string "unit", limit: 20
    t.string "can_null", limit: 1, default: "Y", null: false
    t.string "time_type", limit: 6, default: "month", null: false
    t.string "need_desc", limit: 1, default: "Y", null: false
    t.string "need_file", limit: 1, default: "N", null: false
    t.string "valuedisplay", limit: 200
  end

  create_table "raw_head_category", primary_key: "uuid", id: :string, limit: 45, force: :cascade do |t|
    t.string "name", limit: 200
    t.string "description", limit: 2000
    t.decimal "lan_no"
    t.string "company_uuid", limit: 45, null: false
    t.index ["name", "company_uuid"], name: "uk_name_company_uuid", unique: true
  end

  create_table "region", primary_key: "uuid", id: :string, limit: 45, force: :cascade do |t|
    t.string "region_name", limit: 100, null: false
    t.string "compnay_uuid", limit: 45, null: false
    t.date "create_date"
    t.date "update_date"
    t.string "is_active", limit: 1, default: "Y"
    t.string "region_desc", limit: 2000
  end

  create_table "schedule", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "schedule_name", limit: 500, null: false
    t.date "schedule_end_date", null: false
    t.date "last_run_time"
    t.string "last_run_status", limit: 10
    t.string "is_cycle", limit: 1, null: false
    t.date "single_date"
    t.string "hour", limit: 2
    t.string "minute", limit: 2
    t.string "cycle_type", limit: 100, null: false
    t.integer "c_minute", precision: 38
    t.integer "c_hour", precision: 38
    t.integer "c_day", precision: 38
    t.integer "c_week", precision: 38
    t.string "c_day_of_week", limit: 50
    t.integer "c_month", precision: 38
    t.string "c_day_of_month", limit: 50
    t.string "c_week_of_month", limit: 50
    t.integer "c_year", precision: 38
    t.string "c_week_of_year", limit: 1024
    t.string "run_url", limit: 1024, null: false
    t.string "run_url_parameter", limit: 1024
    t.string "run_attendant_uuid", limit: 36
    t.string "is_active", limit: 1, null: false
    t.date "start_date"
    t.string "run_security", limit: 200
    t.string "expend_all", limit: 1
    t.date "contiune_datetime"
  end

  create_table "sitemap", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "is_active", limit: 1, default: "Y", null: false
    t.date "create_date", null: false
    t.string "create_user", limit: 36, null: false
    t.date "update_date"
    t.string "update_user", limit: 36
    t.string "sitemap_uuid", limit: 36
    t.string "apppage_uuid", limit: 36, null: false
    t.string "root_uuid", limit: 36, null: false
    t.string "haschild", limit: 1, default: "N", null: false
    t.string "application_head_uuid", limit: 36
    t.index ["apppage_uuid", "sitemap_uuid"], name: "sitemap_uk1", unique: true
  end

  create_table "time", primary_key: ["time_id", "time_type"], force: :cascade do |t|
    t.string "time_id", limit: 7, null: false
    t.string "time_type", limit: 10, null: false
  end

  create_table "unit", primary_key: "uuid", id: :string, limit: 60, comment: "UUID", force: :cascade do |t|
    t.string "unit_name", limit: 100, comment: "????"
    t.string "unit_c_desc", limit: 200, comment: "????(??)"
    t.string "is_active", limit: 1, default: "Y", null: false, comment: "???"
    t.date "create_date", comment: "????"
    t.date "update_date", comment: "????"
    t.string "unit_category_uuid", limit: 40, comment: "?????UUID"
    t.string "unit_e_desc", limit: 200, comment: "????(??)"
    t.index ["unit_name", "unit_category_uuid"], name: "unit_uk_01", unique: true
  end

  create_table "unit_category", primary_key: "uuid", id: :string, limit: 40, force: :cascade do |t|
    t.string "company_uuid", limit: 40, comment: "company_uuid"
    t.string "name", limit: 100, comment: "??????"
    t.string "description", limit: 400, comment: "??????"
    t.date "create_date", comment: "????"
    t.date "update_date", comment: "????"
    t.string "is_public", limit: 1, default: "Y", comment: "??????"
    t.string "is_active", limit: 1, default: "Y", comment: "??????"
    t.index ["name", "company_uuid"], name: "unit_category_01", unique: true
  end

  create_table "upload_job", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "frame_head_uuid", limit: 36, null: false
    t.string "raw_head_uuid", limit: 36, null: false
    t.string "time_id", limit: 6, null: false
    t.string "company_uuid", limit: 36, null: false
    t.string "files_group_id", limit: 36
    t.decimal "value"
    t.string "explain", limit: 4000
    t.string "dwg1_gid", limit: 36
    t.string "dwg2_gid", limit: 36
    t.string "dwg3_gid", limit: 36
    t.string "dwg4_gid", limit: 36
    t.string "dwg5_gid", limit: 36
    t.date "update_date"
    t.decimal "status"
    t.string "skip", limit: 1, default: "N"
    t.string "skip_result", limit: 200
    t.string "dwg1_show", limit: 200
    t.string "dwg2_show", limit: 200
    t.string "dwg3_show", limit: 200
    t.string "dwg4_show", limit: 200
    t.string "dwg5_show", limit: 200
    t.decimal "finish", default: "0.0"
    t.string "full_attendant_uuid", limit: 4000, comment: "???????uuid?"
    t.decimal "files_count", default: "0.0", comment: "?????"
    t.string "now_attendant_uuid", limit: 1000, comment: "???????uuid?"
    t.string "last_attendant_uuid", limit: 1000, comment: "????????uuid?"
    t.index ["frame_head_uuid", "raw_head_uuid", "time_id", "company_uuid"], name: "uk_uj1", unique: true
    t.index ["frame_head_uuid", "raw_head_uuid"], name: "inx_uj_02"
    t.index ["full_attendant_uuid", "raw_head_uuid", "time_id"], name: "inx_uj_01"
  end

  create_table "upload_job_log", primary_key: "uuid", id: :string, limit: 36, force: :cascade do |t|
    t.string "upload_job_uuid", limit: 36
    t.decimal "seq"
    t.date "create_date"
    t.string "attendant_uuid", limit: 36
    t.string "msg", limit: 800
    t.index ["upload_job_uuid", "seq"], name: "uk", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: 6
    t.datetime "remember_created_at", precision: 6
    t.integer "sign_in_count", precision: 38, default: 0, null: false
    t.datetime "current_sign_in_at", precision: 6
    t.datetime "last_sign_in_at", precision: 6
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "i_users_reset_password_token", unique: true
  end

  add_foreign_key "appmenu", "application_head", column: "application_head_uuid", primary_key: "uuid", name: "appmenu_application_head_fk1"
  add_foreign_key "appmenu", "appmenu", column: "appmenu_uuid", primary_key: "uuid", name: "appmenu_appmenu_fk1"
  add_foreign_key "appmenu", "sitemap", column: "sitemap_uuid", primary_key: "uuid", name: "appmenu_sitemap_fk1"
  add_foreign_key "appmenu_proxy_map", "proxy", column: "proxy_uuid", primary_key: "uuid", name: "fk_apppage_proxy_map_proxy"
  add_foreign_key "apppage", "application_head", column: "application_head_uuid", primary_key: "uuid", name: "apppage_application_head_fk1"
  add_foreign_key "attendant", "company", column: "company_uuid", primary_key: "uuid", name: "attendant_fk1"
  add_foreign_key "cal", "frame_head", column: "frame_head_uuid", primary_key: "uuid", name: "fk_cal_fh"
  add_foreign_key "cal", "kpi_head", column: "kpi_head_uuid", primary_key: "uuid", name: "fk_cal_kpi"
  add_foreign_key "chart_list", "attendant", column: "attendant_uuid", primary_key: "uuid", name: "fk_chart_01"
  add_foreign_key "frame_head", "company", column: "company_uuid", primary_key: "uuid", name: "frame_head_fk1"
  add_foreign_key "frame_head", "kpi_package", column: "kpi_package_uuid", primary_key: "uuid", name: "fk_fh_kp_uuid"
  add_foreign_key "frame_item", "frame_head", column: "frame_head_uuid", primary_key: "uuid", name: "fk_frame_head_uuid"
  add_foreign_key "group_appmenu", "appmenu", column: "appmenu_uuid", primary_key: "uuid", name: "group_appmenu_appmenu_fk1"
  add_foreign_key "group_appmenu", "group_head", column: "group_head_uuid", primary_key: "uuid", name: "group_appmenu_group_head_fk1"
  add_foreign_key "group_attendant", "attendant", column: "attendant_uuid", primary_key: "uuid", name: "group_attendant_attendant_fk1"
  add_foreign_key "group_attendant", "group_head", column: "group_head_uuid", primary_key: "uuid", name: "group_attendant_group_hea_fk1"
  add_foreign_key "group_head", "application_head", column: "application_head_uuid", primary_key: "uuid", name: "group_head_application_he_fk1"
  add_foreign_key "group_head", "company", column: "company_uuid", primary_key: "uuid", name: "group_head_company_fk1"
  add_foreign_key "kpi_formula", "kpi_head", column: "kpi_head_uuid", primary_key: "uuid", name: "fk_kpi_formula_kpi_head_uuid"
  add_foreign_key "kpi_head", "company", column: "company_uuid", primary_key: "uuid", name: "fk_kh_companyuuid"
  add_foreign_key "kpi_package", "company", column: "company_uuid", primary_key: "uuid", name: "fk_kpi_package_company_uuid"
  add_foreign_key "kpi_package_expend", "kpi_package", column: "kpi_package_uuid", primary_key: "uuid", name: "fk_kpe_kpi_package_uuid"
  add_foreign_key "kpi_package_expend", "kpi_package_item", column: "kpi_package_item_uuid", primary_key: "uuid", name: "fk_kpe_kpi_package_item_uuid"
  add_foreign_key "kpi_package_expend", "raw_head", column: "raw_head_uuid", primary_key: "uuid", name: "fk_kpe_raw_head_uuid"
  add_foreign_key "kpi_package_item", "kpi_head", column: "kpi_head_uuid", primary_key: "uuid", name: "fk_kp_item_kpi_head_uuid"
  add_foreign_key "kpi_package_item", "kpi_package", column: "kpi_package_uuid", primary_key: "uuid", name: "fk_kpi_package_uuid"
  add_foreign_key "parameter_item", "parameter_head", column: "parameter_head_uuid", primary_key: "uuid", name: "parameter_item_fk1"
  add_foreign_key "parameter_item", "region", column: "region_uuid", primary_key: "uuid", name: "parameter_item_fk2"
  add_foreign_key "parameter_month", "parameter_item", column: "parameter_item_uuid", primary_key: "uuid", name: "parameter_month_fk1"
  add_foreign_key "proxy", "application_head", column: "application_head_uuid", primary_key: "uuid", name: "fk_proxy_application_head"
  add_foreign_key "pwg", "attendant", column: "attendant_uuid", primary_key: "uuid", name: "fk_pwg1"
  add_foreign_key "raw_head", "raw_head_category", column: "raw_category_uuid", primary_key: "uuid", name: "fk_raw_head_category"
  add_foreign_key "raw_head_category", "company", column: "company_uuid", primary_key: "uuid", name: "fk_rc_company_uuid"
  add_foreign_key "region", "company", column: "compnay_uuid", primary_key: "uuid", name: "fk_region_1"
  add_foreign_key "schedule", "attendant", column: "run_attendant_uuid", primary_key: "uuid", name: "fk_schedule_attendant"
  add_foreign_key "sitemap", "application_head", column: "application_head_uuid", primary_key: "uuid", name: "sitemap_application_head_fk1"
  add_foreign_key "sitemap", "apppage", column: "apppage_uuid", primary_key: "uuid", name: "sitemap_apppage_fk1"
  add_foreign_key "sitemap", "sitemap", column: "root_uuid", primary_key: "uuid", name: "sitemap_sitemap_fk2"
  add_foreign_key "sitemap", "sitemap", column: "sitemap_uuid", primary_key: "uuid", name: "sitemap_sitemap_fk1"
  add_foreign_key "unit", "unit_category", column: "unit_category_uuid", primary_key: "uuid", name: "unit_fk"
  add_foreign_key "upload_job", "company", column: "company_uuid", primary_key: "uuid", name: "fk_uj3"
  add_foreign_key "upload_job", "frame_head", column: "frame_head_uuid", primary_key: "uuid", name: "fk_uj1"
  add_foreign_key "upload_job", "raw_head", column: "raw_head_uuid", primary_key: "uuid", name: "fk_uj2"
end
