export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_dashboard_data: {
        Row: {
          category: string
          created_at: string | null
          icon: string | null
          id: string
          link: string | null
          order_number: number
          title: string
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          icon?: string | null
          id?: string
          link?: string | null
          order_number?: number
          title: string
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          icon?: string | null
          id?: string
          link?: string | null
          order_number?: number
          title?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          academic_year: string | null
          content: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          grade_level: string | null
          id: string
          published: boolean | null
          semester: number | null
          subject: string | null
          submission_type: string | null
          title: string
          total_marks: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          academic_year?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          grade_level?: string | null
          id?: string
          published?: boolean | null
          semester?: number | null
          subject?: string | null
          submission_type?: string | null
          title: string
          total_marks?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          academic_year?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          grade_level?: string | null
          id?: string
          published?: boolean | null
          semester?: number | null
          subject?: string | null
          submission_type?: string | null
          title?: string
          total_marks?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      branches: {
        Row: {
          code: string
          created_at: string | null
          cycle: Database["public"]["Enums"]["education_cycle"]
          id: string
          name_ar: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          cycle: Database["public"]["Enums"]["education_cycle"]
          id?: string
          name_ar: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          cycle?: Database["public"]["Enums"]["education_cycle"]
          id?: string
          name_ar?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      competitions: {
        Row: {
          academic_year: string | null
          competition_type: string | null
          content: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          grade_level: string | null
          id: string
          max_participants: number | null
          participation_requirements: string | null
          published: boolean | null
          start_date: string | null
          subject: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          academic_year?: string | null
          competition_type?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          grade_level?: string | null
          id?: string
          max_participants?: number | null
          participation_requirements?: string | null
          published?: boolean | null
          start_date?: string | null
          subject?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          academic_year?: string | null
          competition_type?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          grade_level?: string | null
          id?: string
          max_participants?: number | null
          participation_requirements?: string | null
          published?: boolean | null
          start_date?: string | null
          subject?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      education_levels: {
        Row: {
          created_at: string
          cycle: Database["public"]["Enums"]["education_cycle"]
          id: string
          level: string
          name_ar: string
        }
        Insert: {
          created_at?: string
          cycle: Database["public"]["Enums"]["education_cycle"]
          id?: string
          level: string
          name_ar: string
        }
        Update: {
          created_at?: string
          cycle?: Database["public"]["Enums"]["education_cycle"]
          id?: string
          level?: string
          name_ar?: string
        }
        Relationships: []
      }
      educational_units: {
        Row: {
          created_at: string | null
          description: string | null
          education_level_id: string | null
          id: string
          order_number: number
          subject_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          education_level_id?: string | null
          id?: string
          order_number: number
          subject_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          education_level_id?: string | null
          id?: string
          order_number?: number
          subject_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "educational_units_education_level_id_fkey"
            columns: ["education_level_id"]
            isOneToOne: false
            referencedRelation: "education_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educational_units_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          academic_year: string | null
          content: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          exam_type: string | null
          grade_level: string | null
          id: string
          is_template: boolean | null
          published: boolean | null
          semester: number | null
          subject: string | null
          template_id: string | null
          title: string
          total_marks: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          academic_year?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          exam_type?: string | null
          grade_level?: string | null
          id?: string
          is_template?: boolean | null
          published?: boolean | null
          semester?: number | null
          subject?: string | null
          template_id?: string | null
          title: string
          total_marks?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          academic_year?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          exam_type?: string | null
          grade_level?: string | null
          id?: string
          is_template?: boolean | null
          published?: boolean | null
          semester?: number | null
          subject?: string | null
          template_id?: string | null
          title?: string
          total_marks?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exams_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      grade_levels: {
        Row: {
          branch_id: string | null
          code: string
          created_at: string | null
          id: string
          name_ar: string
          order_number: number
          updated_at: string | null
        }
        Insert: {
          branch_id?: string | null
          code: string
          created_at?: string | null
          id?: string
          name_ar: string
          order_number: number
          updated_at?: string | null
        }
        Update: {
          branch_id?: string | null
          code?: string
          created_at?: string | null
          id?: string
          name_ar?: string
          order_number?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grade_levels_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_base_relationships: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          relationship_type: string
          source_id: string | null
          source_type: string | null
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type: string
          source_id?: string | null
          source_type?: string | null
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          relationship_type?: string
          source_id?: string | null
          source_type?: string | null
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_base_relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_items"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_plans: {
        Row: {
          content: string | null
          created_at: string | null
          grade_level: string | null
          id: string
          lesson_number: number | null
          objectives: string[] | null
          semester: number | null
          subject_id: string | null
          title: string
          unit_number: number | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          grade_level?: string | null
          id?: string
          lesson_number?: number | null
          objectives?: string[] | null
          semester?: number | null
          subject_id?: string | null
          title: string
          unit_number?: number | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          grade_level?: string | null
          id?: string
          lesson_number?: number | null
          objectives?: string[] | null
          semester?: number | null
          subject_id?: string | null
          title?: string
          unit_number?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_plans_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_texts: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          lesson_plan_id: string | null
          text_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          lesson_plan_id?: string | null
          text_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          lesson_plan_id?: string | null
          text_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_texts_lesson_plan_id_fkey"
            columns: ["lesson_plan_id"]
            isOneToOne: false
            referencedRelation: "lesson_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          academic_year: string | null
          content: string | null
          created_at: string | null
          description: string | null
          grade_level: string | null
          id: string
          learning_objectives: string[] | null
          lesson_number: number | null
          published: boolean | null
          semester: number | null
          subject: string | null
          title: string
          unit_number: number | null
          user_id: string | null
        }
        Insert: {
          academic_year?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          learning_objectives?: string[] | null
          lesson_number?: number | null
          published?: boolean | null
          semester?: number | null
          subject?: string | null
          title: string
          unit_number?: number | null
          user_id?: string | null
        }
        Update: {
          academic_year?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          learning_objectives?: string[] | null
          lesson_number?: number | null
          published?: boolean | null
          semester?: number | null
          subject?: string | null
          title?: string
          unit_number?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      literary_texts: {
        Row: {
          author: string | null
          content: string | null
          created_at: string | null
          genre: string | null
          grade_level: string | null
          id: string
          subject_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          genre?: string | null
          grade_level?: string | null
          id?: string
          subject_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          genre?: string | null
          grade_level?: string | null
          id?: string
          subject_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "literary_texts_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_files: {
        Row: {
          content_type: string
          created_at: string
          document_type: Database["public"]["Enums"]["pdf_document_type"]
          education_level: Database["public"]["Enums"]["education_cycle"]
          file_path: string
          file_size: number
          filename: string
          grade_level: string
          id: string
          processed: boolean
          processed_content: Json | null
          processing_status: string | null
          subject_id: string | null
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          content_type: string
          created_at?: string
          document_type?: Database["public"]["Enums"]["pdf_document_type"]
          education_level: Database["public"]["Enums"]["education_cycle"]
          file_path: string
          file_size: number
          filename: string
          grade_level: string
          id?: string
          processed?: boolean
          processed_content?: Json | null
          processing_status?: string | null
          subject_id?: string | null
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          content_type?: string
          created_at?: string
          document_type?: Database["public"]["Enums"]["pdf_document_type"]
          education_level?: Database["public"]["Enums"]["education_cycle"]
          file_path?: string
          file_size?: number
          filename?: string
          grade_level?: string
          id?: string
          processed?: boolean
          processed_content?: Json | null
          processing_status?: string | null
          subject_id?: string | null
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "pdf_files_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          role?: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      secrets: {
        Row: {
          created_at: string
          id: string
          name: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          value?: string
        }
        Relationships: []
      }
      section_content: {
        Row: {
          content: string
          created_at: string | null
          id: string
          section_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          section_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          section_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_section"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string | null
          id: string
          order_number: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_number: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_number?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subject_prompts: {
        Row: {
          content: string
          created_at: string | null
          grade_level: string | null
          id: string
          prompt_type: string
          subject_id: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          grade_level?: string | null
          id?: string
          prompt_type: string
          subject_id?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          grade_level?: string | null
          id?: string
          prompt_type?: string
          subject_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subject_prompts_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          branch_id: string | null
          code: string | null
          created_at: string | null
          cycle: string | null
          description: string | null
          grade_level: string | null
          id: string
          is_active: boolean | null
          name: string
          order_number: number | null
          updated_at: string | null
        }
        Insert: {
          branch_id?: string | null
          code?: string | null
          created_at?: string | null
          cycle?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          order_number?: number | null
          updated_at?: string | null
        }
        Update: {
          branch_id?: string | null
          code?: string | null
          created_at?: string | null
          cycle?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          order_number?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_subjects_branch"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subjects_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_profiles: {
        Row: {
          created_at: string | null
          education_cycle: Database["public"]["Enums"]["education_cycle"] | null
          education_levels: number[] | null
          has_selected_subjects: boolean | null
          id: string
          specialization: string | null
          teaching_level: string | null
          updated_at: string | null
          years_of_experience: number | null
        }
        Insert: {
          created_at?: string | null
          education_cycle?:
            | Database["public"]["Enums"]["education_cycle"]
            | null
          education_levels?: number[] | null
          has_selected_subjects?: boolean | null
          id: string
          specialization?: string | null
          teaching_level?: string | null
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Update: {
          created_at?: string | null
          education_cycle?:
            | Database["public"]["Enums"]["education_cycle"]
            | null
          education_levels?: number[] | null
          has_selected_subjects?: boolean | null
          id?: string
          specialization?: string | null
          teaching_level?: string | null
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      teacher_subjects: {
        Row: {
          created_at: string | null
          id: string
          subject_id: string | null
          teacher_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          subject_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          subject_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teaching_levels: {
        Row: {
          created_at: string | null
          id: string
          level_code: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          level_code: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          level_code?: string
          name?: string
        }
        Relationships: []
      }
      yearly_distributions: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          subject_id: string | null
          unit_number: number | null
          unit_title: string | null
          updated_at: string | null
          week_number: number | null
          year_number: number
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          subject_id?: string | null
          unit_number?: number | null
          unit_title?: string | null
          updated_at?: string | null
          week_number?: number | null
          year_number: number
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          subject_id?: string | null
          unit_number?: number | null
          unit_title?: string | null
          updated_at?: string | null
          week_number?: number | null
          year_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "yearly_distributions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      yearly_plans: {
        Row: {
          academic_year: string
          content: Json | null
          created_at: string | null
          description: string | null
          grade_level: string
          id: string
          subject_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          academic_year: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          grade_level: string
          id?: string
          subject_id?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          academic_year?: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          grade_level?: string
          id?: string
          subject_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yearly_plans_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      yearly_progressions: {
        Row: {
          academic_year: string
          content: Json | null
          created_at: string | null
          description: string | null
          grade_level: string
          id: string
          subject_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          academic_year: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          grade_level: string
          id?: string
          subject_id?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          academic_year?: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          grade_level?: string
          id?: string
          subject_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yearly_progressions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      check_teacher_role: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      check_user_role_secure: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      has_teaching_role: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_admin_check: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student"
      education_cycle: "primary" | "middle" | "secondary"
      pdf_document_type: "yearly_plan" | "yearly_progression"
      teacher_role: "admin" | "teacher" | "supervisor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
