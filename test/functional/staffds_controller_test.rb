require 'test_helper'

class StaffdsControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:staffds)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_staffd
    assert_difference('Staffd.count') do
      post :create, :staffd => { }
    end

    assert_redirected_to staffd_path(assigns(:staffd))
  end

  def test_should_show_staffd
    get :show, :id => staffds(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => staffds(:one).id
    assert_response :success
  end

  def test_should_update_staffd
    put :update, :id => staffds(:one).id, :staffd => { }
    assert_redirected_to staffd_path(assigns(:staffd))
  end

  def test_should_destroy_staffd
    assert_difference('Staffd.count', -1) do
      delete :destroy, :id => staffds(:one).id
    end

    assert_redirected_to staffds_path
  end
end
